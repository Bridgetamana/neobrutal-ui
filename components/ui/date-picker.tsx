"use client"

import * as React from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay()
}

function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

function getMonthName(month: number) {
    return new Date(2000, month).toLocaleDateString("en-US", { month: "long" })
}

function isSameDay(a: Date | null, b: Date | null) {
    if (!a || !b) return false
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

function isToday(date: Date) {
    return isSameDay(date, new Date())
}

interface DatePickerProps {
    value?: Date | null
    onChange?: (date: Date | null) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

function DatePicker({
    value = null,
    onChange,
    placeholder = "Select date",
    disabled = false,
    className,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(value)
    const [pendingDate, setPendingDate] = React.useState<Date | null>(value)
    const [displayMonth, setDisplayMonth] = React.useState(
        value ? value.getMonth() : new Date().getMonth()
    )
    const [displayYear, setDisplayYear] = React.useState(
        value ? value.getFullYear() : new Date().getFullYear()
    )

    React.useEffect(() => {
        setSelectedDate(value)
        setPendingDate(value)
    }, [value])

    const daysInMonth = getDaysInMonth(displayYear, displayMonth)
    const firstDay = getFirstDayOfMonth(displayYear, displayMonth)

    const prevMonthDays = getDaysInMonth(
        displayMonth === 0 ? displayYear - 1 : displayYear,
        displayMonth === 0 ? 11 : displayMonth - 1
    )

    const calendarDays: { day: number; month: number; year: number; isCurrentMonth: boolean }[] = []

    // Previous month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
        const prevMonth = displayMonth === 0 ? 11 : displayMonth - 1
        const prevYear = displayMonth === 0 ? displayYear - 1 : displayYear
        calendarDays.push({
            day: prevMonthDays - i,
            month: prevMonth,
            year: prevYear,
            isCurrentMonth: false,
        })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            day: i,
            month: displayMonth,
            year: displayYear,
            isCurrentMonth: true,
        })
    }

    // Next month leading days
    const remaining = 42 - calendarDays.length
    for (let i = 1; i <= remaining; i++) {
        const nextMonth = displayMonth === 11 ? 0 : displayMonth + 1
        const nextYear = displayMonth === 11 ? displayYear + 1 : displayYear
        calendarDays.push({
            day: i,
            month: nextMonth,
            year: nextYear,
            isCurrentMonth: false,
        })
    }

    function handlePrevMonth() {
        if (displayMonth === 0) {
            setDisplayMonth(11)
            setDisplayYear(displayYear - 1)
        } else {
            setDisplayMonth(displayMonth - 1)
        }
    }

    function handleNextMonth() {
        if (displayMonth === 11) {
            setDisplayMonth(0)
            setDisplayYear(displayYear + 1)
        } else {
            setDisplayMonth(displayMonth + 1)
        }
    }

    function handleDayClick(day: number, month: number, year: number) {
        setPendingDate(new Date(year, month, day))
    }

    function handleApply() {
        setSelectedDate(pendingDate)
        onChange?.(pendingDate)
        setOpen(false)
    }

    function handleCancel() {
        setPendingDate(selectedDate)
        if (selectedDate) {
            setDisplayMonth(selectedDate.getMonth())
            setDisplayYear(selectedDate.getFullYear())
        }
        setOpen(false)
    }

    return (
        <BasePopover.Root open={open} onOpenChange={setOpen}>
            <BasePopover.Trigger
                disabled={disabled}
                className={cn(
                    "inline-flex h-10 w-full max-w-[280px] items-center gap-2 rounded-base border-2 border-black bg-white px-3 py-2 text-sm font-medium text-black shadow-brutal transition-colors hover:bg-main/10 focus-brutal disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
            >
                <Calendar className="h-4 w-4 shrink-0 opacity-60" />
                <span className={cn("flex-1 text-left", !selectedDate && "text-black/50")}>
                    {selectedDate ? formatDate(selectedDate) : placeholder}
                </span>
            </BasePopover.Trigger>
            <BasePopover.Portal>
                <BasePopover.Positioner sideOffset={4} side="bottom" align="start">
                    <BasePopover.Popup className="z-50 w-[300px] rounded-base border-2 border-black bg-white shadow-brutal transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
                        <div className="flex items-center justify-between border-b-2 border-black px-3 py-2">
                            <button
                                type="button"
                                onClick={handlePrevMonth}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-base border-2 border-black bg-white text-black transition-colors hover:bg-main/20 focus-brutal"
                                aria-label="Previous month"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-bold text-black">
                                {getMonthName(displayMonth)} {displayYear}
                            </span>
                            <button
                                type="button"
                                onClick={handleNextMonth}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-base border-2 border-black bg-white text-black transition-colors hover:bg-main/20 focus-brutal"
                                aria-label="Next month"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Day headers */}
                        <div className="grid grid-cols-7 px-2 pt-2">
                            {DAYS.map((day) => (
                                <div
                                    key={day}
                                    className="flex h-8 items-center justify-center text-xs font-bold text-black/50"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar grid */}
                        <div className="grid grid-cols-7 px-2 pb-2">
                            {calendarDays.map((d, i) => {
                                const cellDate = new Date(d.year, d.month, d.day)
                                const isSelected = isSameDay(pendingDate, cellDate)
                                const isTodayDate = isToday(cellDate)

                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => handleDayClick(d.day, d.month, d.year)}
                                        className={cn(
                                            "flex h-8 w-full items-center justify-center text-sm transition-all duration-200 active:scale-90 rounded-base",
                                            d.isCurrentMonth
                                                ? "text-black font-medium"
                                                : "text-black/30",
                                            isSelected &&
                                                "bg-main border-2 border-black font-bold text-black shadow-brutal",
                                            !isSelected && d.isCurrentMonth && "hover:bg-main/20",
                                            isTodayDate && !isSelected && "border-2 border-black/30"
                                        )}
                                    >
                                        {d.day}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-2 border-t-2 border-black px-3 py-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="inline-flex h-8 items-center justify-center rounded-base border-2 border-black bg-white px-4 text-sm font-bold text-black transition-all duration-200 active:scale-95 hover:bg-main/10 focus-brutal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleApply}
                                className="inline-flex h-8 items-center justify-center rounded-base border-2 border-black bg-black px-4 text-sm font-bold text-white transition-all duration-200 active:scale-95 hover:bg-black/80 focus-brutal"
                            >
                                Apply
                            </button>
                        </div>
                    </BasePopover.Popup>
                </BasePopover.Positioner>
            </BasePopover.Portal>
        </BasePopover.Root>
    )
}
DatePicker.displayName = "DatePicker"

export { DatePicker }
export type { DatePickerProps }
