"use client";

import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const cardCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

export function CardDemo() {
    return (
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>Component Card</CardTitle>
                <CardDescription>A clean, accessible card component.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Add your content here. Cards are perfect for layouts.</p>
            </CardContent>
        </Card>
    )
}`;

const cardCodeWithFooter = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

export function CardDemo() {
    return (
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>Component Card</CardTitle>
                <CardDescription>A clean, accessible card component.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Add your content here. Cards are perfect for layouts.</p>
            </CardContent>
            <CardFooter className="justify-between">
                <Button variant="neutral">Cancel</Button>
                <Button>Save</Button>
            </CardFooter>
        </Card>
    )
}`;

const loginCardCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginCard() {
    return (
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
                <Button className="w-full">Sign In</Button>
                <p className="text-sm text-neutral-500">
                    Don't have an account? <a href="#" className="font-medium underline">Sign up</a>
                </p>
            </CardFooter>
        </Card>
    )
}`;

const htmlCode = `<div class="card">
    <div class="card-header p-6">
        <h3 class="card-title text-2xl font-semibold">Component Card</h3>
        <p class="card-description text-sm text-neutral-500">
            A clean, accessible card component.
        </p>
    </div>
    <div class="card-content p-6 pt-0">
        <p class="text-sm">
            Add your content here. Cards are perfect for layouts.
        </p>
    </div>
</div>`;

export default function CardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold md:text-4xl text-black">Card</h1>
      </header>

      <section className="space-y-4">
        <p className="text-base text-black">
          A container component with bold borders and shadow. Perfect for
          grouping related content.
        </p>
      </section>

      <ComponentPreview code={cardCode} htmlCode={htmlCode}>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Component Card</CardTitle>
            <CardDescription>
              A clean, accessible card component.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Add your content here. Cards are perfect for layouts.
            </p>
          </CardContent>
        </Card>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold border-b-2 border-border pb-2">
          Installation
        </h2>
        <CodeBlock code="npx neobrutal-ui add card" language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold border-b-2 border-border pb-2">
          Usage
        </h2>
        <CodeBlock
          code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

export function CardDemo() {
    return (
        <Card className="max-w-md">
        <CardHeader>
            <CardTitle>Your Title</CardTitle>
            <CardDescription>Your description goes here</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Main content area</p>
        </CardContent>
        <CardFooter>
            <Button>Action</Button>
        </CardFooter>
        </Card>
    )
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold border-b-2 border-border pb-2">
          Composition
        </h2>
        <p className="text-black">
          The Card component is designed to work with sub-components for
          semantic structure.
        </p>
        <ul className="list-disc list-inside space-y-2 text-black">
          <li>
            <strong>Card:</strong> Root container with border and shadow
          </li>
          <li>
            <strong>CardHeader:</strong> Top section, typically for title and
            description
          </li>
          <li>
            <strong>CardTitle:</strong> Main heading (h3 semantically)
          </li>
          <li>
            <strong>CardDescription:</strong> Subtitle or supporting text
          </li>
          <li>
            <strong>CardContent:</strong> Main body content
          </li>
          <li>
            <strong>CardFooter:</strong> Bottom section for actions or metadata
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold border-b-2 border-border pb-2">
          Examples
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">Full Card with Footer</h3>
            <ComponentPreview code={cardCodeWithFooter}>
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Manage your preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Card content goes here with your settings form or content.
                  </p>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="neutral">Cancel</Button>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            </ComponentPreview>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold">Login Card</h3>
          <ComponentPreview code={loginCardCode}>
            <Card className="max-w-sm w-full">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <Button className="w-full">Sign In</Button>
                <p className="text-sm text-neutral-500">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="font-medium underline">
                    Sign up
                  </a>
                </p>
              </CardFooter>
            </Card>
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold border-b-2 border-border pb-2">
          Styling
        </h2>
        <ul className="list-disc list-inside space-y-2 text-black">
          <li>
            <strong>Border:</strong> 2px solid black border for Neobrutalist
            look
          </li>
          <li>
            <strong>Shadow:</strong> Hard 4px offset shadow (no blur)
          </li>
          <li>
            <strong>Radius:</strong> Subtle border radius for modern feel
          </li>
          <li>
            <strong>Padding:</strong> Generous internal spacing (p-6) for
            readability
          </li>
        </ul>
      </div>
    </div>
  );
}
