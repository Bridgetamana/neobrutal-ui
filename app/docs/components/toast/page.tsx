"use client"

import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const usageCode = `<Button
  variant="neutral"
  onClick={() =>
    toast.info("Event has been created", {
      title: "Success",
      actionProps: {
        children: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }
>
  Add to calendar
</Button>`

export default function ToastPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Toast</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A succinct message that is displayed temporarily.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Button
                    variant="neutral"
                    onClick={() =>
                        toast.info("Event has been created", {
                            title: "Success",
                            actionProps: {
                                children: "Undo",
                                onClick: () => console.log("Undo"),
                            },
                        })
                    }
                >
                    Add to calendar
                </Button>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add toast" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"`} />
                <CodeBlock code={usageCode} />
            </div>
        </div>
    )
}
