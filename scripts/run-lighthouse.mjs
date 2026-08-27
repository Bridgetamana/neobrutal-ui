import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { computeMedianRun } from "lighthouse/core/lib/median-run.js";
import config from "../lighthouse.config.mjs";

const reportsDirectory = path.resolve("lighthouse-reports");
const nextCli = path.resolve("node_modules/next/dist/bin/next");

function startServer() {
  const { hostname, port } = new URL(config.baseUrl);
  const server = spawn(
    process.execPath,
    [nextCli, "start", "--hostname", hostname, "--port", port],
    {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    },
  );

  server.stdout.pipe(process.stdout);
  server.stderr.pipe(process.stderr);
  return server;
}

async function waitForServer(server) {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js exited before Lighthouse could connect (${server.exitCode}).`);
    }

    try {
      const response = await fetch(config.baseUrl);
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }

    await delay(250);
  }

  throw new Error(`Timed out waiting for ${config.baseUrl}.`);
}

async function stopServer(server) {
  if (!server || server.exitCode !== null) return;

  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    delay(5_000),
  ]);

  if (server.exitCode === null) server.kill("SIGKILL");
}

function getResources(lhr) {
  const items = lhr.audits["resource-summary"]?.details?.items ?? [];
  return new Map(items.map((item) => [item.resourceType, item]));
}

function evaluateBudgets(lhr) {
  const failures = [];
  const performanceScore = lhr.categories.performance?.score;

  if (
    typeof performanceScore !== "number" ||
    performanceScore < config.budgets.minimumPerformanceScore
  ) {
    failures.push(
      `performance score ${performanceScore ?? "missing"} < ${config.budgets.minimumPerformanceScore}`,
    );
  }

  for (const [auditId, maximum] of Object.entries(config.budgets.metrics)) {
    const actual = lhr.audits[auditId]?.numericValue;
    if (typeof actual !== "number" || actual > maximum) {
      failures.push(`${auditId} ${actual ?? "missing"} > ${maximum}`);
    }
  }

  const resources = getResources(lhr);
  for (const [resourceType, maximum] of Object.entries(config.budgets.resourceSizes)) {
    const actual = resources.get(resourceType)?.transferSize;
    if (typeof actual !== "number" || actual > maximum) {
      failures.push(`${resourceType} transfer size ${actual ?? "missing"} B > ${maximum} B`);
    }
  }

  for (const [resourceType, maximum] of Object.entries(config.budgets.resourceCounts)) {
    const actual = resources.get(resourceType)?.requestCount;
    if (typeof actual !== "number" || actual > maximum) {
      failures.push(`${resourceType} request count ${actual ?? "missing"} > ${maximum}`);
    }
  }

  return failures;
}

function formatSummary(route, lhr) {
  const resources = getResources(lhr);
  const score = Math.round((lhr.categories.performance?.score ?? 0) * 100);
  const fcp = Math.round(lhr.audits["first-contentful-paint"].numericValue);
  const lcp = Math.round(lhr.audits["largest-contentful-paint"].numericValue);
  const tbt = Math.round(lhr.audits["total-blocking-time"].numericValue);
  const totalKb = Math.round((resources.get("total")?.transferSize ?? 0) / 1024);
  return `${route.path}: ${score}/100, FCP ${fcp} ms, LCP ${lcp} ms, TBT ${tbt} ms, ${totalKb} KB`;
}

async function main() {
  await rm(reportsDirectory, { recursive: true, force: true });
  await mkdir(reportsDirectory, { recursive: true });

  let server;
  let chrome;
  let chromeProfile;

  try {
    server = startServer();
    await waitForServer(server);

    chromeProfile = await mkdtemp(path.join(tmpdir(), "neobrutal-lighthouse-"));
    chrome = await launch({
      chromePath: process.env.CHROME_PATH,
      chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
      userDataDir: chromeProfile,
    });

    const manifest = [];
    const routeResults = [];

    for (const route of config.routes) {
      const url = new URL(route.path, config.baseUrl).href;
      const runs = [];

      for (let runNumber = 1; runNumber <= config.numberOfRuns; runNumber += 1) {
        console.log(`Lighthouse ${route.path} (${runNumber}/${config.numberOfRuns})`);
        const result = await lighthouse(url, {
          ...config.settings,
          logLevel: "error",
          output: "html",
          port: chrome.port,
        });

        if (!result) throw new Error(`Lighthouse returned no result for ${url}.`);

        const basename = `${route.name}-run-${runNumber}`;
        const htmlPath = path.join(reportsDirectory, `${basename}.report.html`);
        const jsonPath = path.join(reportsDirectory, `${basename}.report.json`);
        await writeFile(htmlPath, result.report);
        await writeFile(jsonPath, JSON.stringify(result.lhr));

        runs.push({ htmlPath, jsonPath, lhr: result.lhr });
      }

      const medianLhr = computeMedianRun(runs.map((run) => run.lhr));
      const medianRun = runs.find((run) => run.lhr === medianLhr);
      const failures = evaluateBudgets(medianLhr);
      routeResults.push({ route, lhr: medianLhr, failures });

      for (const run of runs) {
        manifest.push({
          url,
          isRepresentativeRun: run === medianRun,
          htmlPath: run.htmlPath,
          jsonPath: run.jsonPath,
          summary: { performance: run.lhr.categories.performance?.score ?? null },
        });
      }
    }

    await writeFile(
      path.join(reportsDirectory, "manifest.json"),
      JSON.stringify(manifest, null, 2),
    );

    const failures = [];
    for (const result of routeResults) {
      console.log(`${result.failures.length ? "✗" : "✓"} ${formatSummary(result.route, result.lhr)}`);
      failures.push(...result.failures.map((failure) => `${result.route.path}: ${failure}`));
    }

    if (failures.length) {
      console.error("\nLighthouse performance budget failures:");
      for (const failure of failures) console.error(`- ${failure}`);
      process.exitCode = 1;
    } else {
      console.log("All Lighthouse performance budgets passed.");
    }
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (error) {
        console.warn(`Chrome cleanup warning: ${error.message}`);
      }
    }
    if (chromeProfile) {
      try {
        await rm(chromeProfile, {
          recursive: true,
          force: true,
          maxRetries: 10,
          retryDelay: 250,
        });
      } catch (error) {
        console.warn(`Chrome profile cleanup warning: ${error.message}`);
      }
    }
    await stopServer(server);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
