import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"
import Image from "next/image"

const usageCode = `import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card className="w-87.5">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="neutral">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
"`

const htmlCode = `<div class="border-2 border-black bg-white text-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md p-4">
  <div class="flex flex-col space-y-1.5 pb-2">
    <h3 class="text-2xl font-bold">Create project</h3>
  </div>
  <p class="text-sm">This is the main content area of the card. You can put text, images, forms, or any other content here.</p>
  <div class="flex justify-between items-center pt-6">
    <button class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold bg-[#fff] text-black border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
        Cancel
    </button>
    <button class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold bg-[#b6ace4] text-black border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
        Deploy
    </button>
  </div>
</div>`

const cardProps = [
  {
    name: "variant",
    type: '"default"',
    defaultValue: '"default"',
    description: "The visual style of the card.",
  },
]

export default function CardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold md:text-4xl text-black">Card</h1>
      </header>

      <section className="space-y-4">
        <p className="text-base text-black">
          A flexible container component with bold borders and shadows. Perfect for displaying content, forms, or any grouped information with a neobrutalist aesthetic.
        </p>
      </section>

      <ComponentPreview code={usageCode} htmlCode={htmlCode}>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is the main content area of the card. You can put text, images, forms, or any other content here.</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="neutral">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Installation</h2>
        <CodeBlock code="npx neobrutal add card" language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Usage</h2>
        <CodeBlock code={`import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`} />
        <CodeBlock code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`} />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Examples</h2>

        <div className="space-y-4">
          <h3 className="font-bold">Default</h3>
          <ComponentPreview code={`<Card className="max-w-sm">
  <CardHeader>
    <CardTitle>Project Alpha</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-sm">This project showcases the latest in neobrutalist design principles.</p>
  </CardContent>
</Card>`}>
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Project Alpha</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">This project showcases the latest in neobrutalist design principles.</p>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold">With Actions</h3>
          <ComponentPreview code={`<Card className="max-w-sm">
  <CardHeader>
    <CardTitle>Task Completed</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-sm">Check out your live application at the link below.</p>
  </CardContent>
  <CardFooter className="flex gap-2">
    <Button variant="neutral">View Details</Button>
    <Button>Go to App</Button>
  </CardFooter>
</Card>`}>
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Task Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Check out your live application at the link below.</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="neutral">View Details</Button>
                <Button>Go to App</Button>
              </CardFooter>
            </Card>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold">Simple Content Only</h3>
          <ComponentPreview code={`<Card className="p-6 max-w-sm">
  <div className="space-y-2">
    <h3 className="text-lg font-bold">Quick Note</h3>
    <p className="text-sm">Sometimes you just need a simple card with padding and content.</p>
  </div>
</Card>`}>
            <Card className="p-6 max-w-sm">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Quick Note</h3>
                <p className="text-sm">Sometimes you just need a simple card with padding and content.</p>
              </div>
            </Card>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold">With Image</h3>
          <ComponentPreview code={`<Card className="max-w-sm">
  <CardHeader>
    <div className="aspect-video w-full overflow-hidden rounded-base border-2 border-black">
      <Image
        src="/mountains-image.jpg"
        alt="Mountain landscape"
        width={400}
        height={225}
        className="h-full w-full object-cover"
      />
    </div>
    <CardTitle>Beautiful Landscape</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-sm">This card features an image at the top with content below.</p>
  </CardContent>
</Card>`}>
            <Card className="max-w-sm">
              <CardHeader>
                <div className="aspect-video w-full overflow-hidden rounded-base border-2 border-black">
                  <Image
                    src="/mountains-image.jpg"
                    alt="Mountain landscape"
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle>Beautiful Landscape</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">This card features an image at the top with content below.</p>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Props</h2>
        <PropsTable data={cardProps} />
      </div>
    </div>
  )
}
