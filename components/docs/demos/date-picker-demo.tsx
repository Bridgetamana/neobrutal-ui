"use client"

import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"

export function DatePickerDemo() {
    const [date, setDate] = useState<Date | null>(null)
    return <DatePicker value={date} onChange={setDate} />
}
