import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ComponentPreview } from "@/components/docs/component-preview";

interface PreviewProps {
  path: string;
  className?: string;
}

export async function Preview({ path, className }: PreviewProps) {
  const code = await readFile(
    join(process.cwd(), "examples", `${path}.tsx`),
    "utf-8"
  );

  const Component = (await import(`../../examples/${path}.tsx`)).default;

  return (
    <ComponentPreview code={code} className={className}>
      <Component />
    </ComponentPreview>
  );
}
