"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadSimple } from "@phosphor-icons/react"

export default function InputFileUploadDemo() {
  return (
    <div className="grid w-full max-w-sm">
      <Label htmlFor="file">Upload Document</Label>
      <label htmlFor="file" className="relative border-2 border-dashed border-black rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer block">
        <UploadSimple className="h-5 w-5 mx-auto mb-2" />
        <div className="text-sm font-semibold">Click to upload</div>
        <p className="text-xs text-gray-600 mt-1">PDF, DOC or DOCX</p>
      </label>
      <Input id="file" type="file" accept=".pdf,.doc,.docx" className="hidden" />
    </div>
  )
}
