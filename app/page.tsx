import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24 bg-bg font-sans">
      <div className="max-w-5xl mx-auto space-y-12">

        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black border-b-4 border-black pb-4 inline-block">
            NeoBrutal UI
          </h1>
          <p className="text-xl md:text-2xl font-medium text-neutral-700">
            A headless-first neobrutalist component library.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Badge variant="default">v1.0.0</Badge>
            <Badge variant="neutral">Open Source</Badge>
            <Badge variant="outline">MIT License</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button styles with hard shadows.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="neutral">Neutral</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="reverse">Reverse</Button>
            </CardContent>
          </Card>

          <Card className="bg-main">
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>Cards can have different background colors.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is a card with a custom background color. It maintains the same hard borders and shadows.</p>
            </CardContent>
            <CardFooter>
              <Button variant="reverse" size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>High contrast inputs and controls.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="hello@neobrutalism.dev" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here..." />
                </div>

                <div className="space-y-2">
                  <Label>Framework</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>

                <div className="space-y-2">
                  <Label>Notification Preference</Label>
                  <RadioGroup defaultValue="email">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="r1" />
                      <Label htmlFor="r1">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms" id="r2" />
                      <Label htmlFor="r2">SMS</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>

                <div className="space-y-2">
                  <Label>Volume</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </main>
  );
}
