import type { ComponentPropsWithoutRef } from "react"
import Link from "next/link"
import { ComponentPreview } from "@/components/docs/component-preview-server"
import { CodeBlock } from "@/components/docs/code-block"
import { InstallTabs } from "@/components/docs/install-tabs"
import { PropsTable } from "@/components/docs/props-table"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationItem } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Changelog } from "@/components/docs/changelog"

import {
    ToastDemo,
    ToastTypesDemo,
    ToastActionDemo,
    ToastPromiseDemo,
} from "@/components/docs/demos/toast-demo"

export const mdxComponents = {
    h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 className="text-3xl font-semibold md:text-4xl mt-8 mb-4 text-black" {...props} />,
    h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 className="text-xl font-semibold mt-8 mb-4 group flex items-center text-black" {...props} />,
    h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 className="text-lg font-semibold mt-6 mb-3 text-black" {...props} />,
    p: (props: ComponentPropsWithoutRef<"p">) => <p className="text-base text-black leading-relaxed" {...props} />,
    a: (props: ComponentPropsWithoutRef<"a">) => {
        const isInternal = props.href?.startsWith("/")
        if (isInternal) {
            return <Link className="text-black underline underline-offset-4 font-semibold hover:text-black/70 transition-colors" {...props} href={props.href!} />
        }
        return <a className="text-black underline underline-offset-4 font-semibold hover:text-black/70 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
    },
    ul: (props: ComponentPropsWithoutRef<"ul">) => <ul className="list-disc list-inside space-y-2 my-4 text-black" {...props} />,
    ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="list-decimal list-inside space-y-2 my-4 text-black" {...props} />,
    code: (props: ComponentPropsWithoutRef<"code">) => <code className="font-mono text-sm bg-bg border-2 border-black rounded-base px-1.5 py-0.5 font-bold text-black" {...props} />,
    strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-bold" {...props} />,
    Link,
    ComponentPreview,
    CodeBlock,
    InstallTabs,
    PropsTable,
    Changelog,
    Accordion, AccordionItem, AccordionTrigger, AccordionContent,
    Alert, AlertTitle, AlertDescription,
    Avatar, AvatarImage, AvatarFallback, AvatarGroup,
    Badge,
    Button,
    Card, CardHeader, CardFooter, CardTitle, CardContent,
    Checkbox,
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
    Input,
    Label,
    Pagination, PaginationItem,
    Popover, PopoverContent, PopoverTrigger,
    Progress,
    RadioGroup, RadioGroupItem,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
    Slider,
    Switch,
    Tabs, TabsList, TabsTrigger, TabsContent,
    Textarea,
    Toaster,
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
    ToastDemo, ToastTypesDemo, ToastActionDemo, ToastPromiseDemo,
}
