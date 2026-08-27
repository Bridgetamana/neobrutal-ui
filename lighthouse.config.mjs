const lighthouseConfig = {
  baseUrl: "http://127.0.0.1:3000",
  numberOfRuns: 3,
  routes: [
    { name: "home", path: "/" },
    { name: "docs", path: "/docs" },
    { name: "button", path: "/docs/components/button" },
  ],
  settings: {
    maxWaitForLoad: 60_000,
    onlyCategories: ["performance"],
  },
  budgets: {
    minimumPerformanceScore: 0.5,
    metrics: {
      "first-contentful-paint": 1_800,
      "largest-contentful-paint": 6_000,
      "speed-index": 4_500,
      "total-blocking-time": 1_500,
      "cumulative-layout-shift": 0.1,
    },
    resourceSizes: {
      total: 563_200,
      script: 358_400,
      stylesheet: 20_480,
      font: 35_840,
      image: 51_200,
    },
    resourceCounts: {
      total: 60,
      script: 25,
    },
  },
};

export default lighthouseConfig;
