"use client"

import * as React from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const
const FULL_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
})

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

function getDateKey(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

interface DatePickerProps {
    value?: Date | null
    onChange?: (date: Date | null) => void
    placeholder?: string
    disabled?: boolean
    className?: string
}

function DatePicker({
    value,
    onChange,
    placeholder = "Select date",
    disabled = false,
    className,
}: DatePickerProps) {
    const calendarRef = React.useRef<HTMLDivElement>(null)
    const [open, setOpen] = React.useState(false)
    const [internalSelectedDate, setInternalSelectedDate] = React.useState<Date | null>(
        value ?? null
    )
    const selectedDate = value !== undefined ? value : internalSelectedDate
    const [pendingDate, setPendingDate] = React.useState<Date | null>(selectedDate)
    const [displayMonth, setDisplayMonth] = React.useState(
        selectedDate ? selectedDate.getMonth() : new Date().getMonth()
    )
    const [displayYear, setDisplayYear] = React.useState(
        selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
    )

    function handleOpenChange(nextOpen: boolean) {
        if (nextOpen) {
            const focusedDate = selectedDate ?? new Date()
            setPendingDate(selectedDate)
            setDisplayMonth(focusedDate.getMonth())
            setDisplayYear(focusedDate.getFullYear())
        }
        setOpen(nextOpen)
    }

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

    function handleDayKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, date: Date) {
        const nextDate = new Date(date)

        if (event.key === "ArrowLeft") nextDate.setDate(date.getDate() - 1)
        else if (event.key === "ArrowRight") nextDate.setDate(date.getDate() + 1)
        else if (event.key === "ArrowUp") nextDate.setDate(date.getDate() - 7)
        else if (event.key === "ArrowDown") nextDate.setDate(date.getDate() + 7)
        else if (event.key === "Home") nextDate.setDate(date.getDate() - date.getDay())
        else if (event.key === "End") nextDate.setDate(date.getDate() + (6 - date.getDay()))
        else if (event.key === "PageUp") nextDate.setMonth(date.getMonth() - 1)
        else if (event.key === "PageDown") nextDate.setMonth(date.getMonth() + 1)
        else return

        event.preventDefault()
        setPendingDate(nextDate)
        setDisplayMonth(nextDate.getMonth())
        setDisplayYear(nextDate.getFullYear())
        requestAnimationFrame(() => {
            document.querySelector<HTMLButtonElement>(
                `[data-date="${getDateKey(nextDate)}"]`
            )?.focus()
        })
    }

    const calendarWeeks = Array.from({ length: 6 }, (_, index) =>
        calendarDays.slice(index * 7, index * 7 + 7)
    )

    function handleApply() {
        if (value === undefined) setInternalSelectedDate(pendingDate)
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
        <BasePopover.Root open={open} onOpenChange={handleOpenChange}>
            <BasePopover.Trigger
                disabled={disabled}
                aria-label={selectedDate ? `Change date, ${formatDate(selectedDate)}` : "Choose date"}
                className={cn(
                    "inline-flex min-h-11 w-full max-w-[280px] items-center gap-2 rounded-base border-2 border-black bg-white px-3 py-2 text-sm font-medium text-black shadow-brutal transition-colors hover:bg-main/10 focus-brutal disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
            >
                <Calendar aria-hidden="true" className="h-4 w-4 shrink-0 opacity-60" />
                <span className={cn("flex-1 text-left", !selectedDate && "text-black/60")}>
                    {selectedDate ? formatDate(selectedDate) : placeholder}
                </span>
            </BasePopover.Trigger>
            <BasePopover.Portal>
                <BasePopover.Positioner sideOffset={4} side="bottom" align="start">
                    <BasePopover.Popup
                        aria-label="Choose a date"
                        initialFocus={() =>
                            calendarRef.current?.querySelector<HTMLButtonElement>(
                                'button[tabindex="0"]'
                            ) ?? null
                        }
                        className="z-50 w-[min(340px,calc(100vw-2rem))] rounded-base border-2 border-black bg-white shadow-brutal transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] motion-reduce:transition-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
                    >
                        <div className="flex items-center justify-between border-b-2 border-black px-3 py-2">
                            <button
                                type="button"
                                onClick={handlePrevMonth}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-base border-2 border-black bg-white text-black transition-colors hover:bg-main/20 focus-brutal"
                                aria-label="Previous month"
                            >
                                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                            </button>
                            <span aria-live="polite" className="text-sm font-bold text-black">
                                {getMonthName(displayMonth)} {displayYear}
                            </span>
                            <button
                                type="button"
                                onClick={handleNextMonth}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-base border-2 border-black bg-white text-black transition-colors hover:bg-main/20 focus-brutal"
                                aria-label="Next month"
                            >
                                <ChevronRight aria-hidden="true" className="h-4 w-4" />
                            </button>
                        </div>

                        <div ref={calendarRef} role="grid" aria-label={`${getMonthName(displayMonth)} ${displayYear}`} className="grid grid-cols-7 px-2 pb-2 pt-2">
                            <div role="row" className="contents">
                                {DAYS.map((day) => (
                                    <div
                                        key={day}
                                        role="columnheader"
                                        className="flex h-8 items-center justify-center text-xs font-bold text-black/60"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {calendarWeeks.map((week, weekIndex) => (
                                <div key={weekIndex} role="row" className="contents">
                                    {week.map((d) => {
                                        const cellDate = new Date(d.year, d.month, d.day)
                                        const isSelected = isSameDay(pendingDate, cellDate)
                                        const isTodayDate = isToday(cellDate)

                                        return (
                                            <div
                                                key={getDateKey(cellDate)}
                                                role="gridcell"
                                                aria-selected={isSelected}
                                                className="contents"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => handleDayClick(d.day, d.month, d.year)}
                                                    onKeyDown={(event) => handleDayKeyDown(event, cellDate)}
                                                    data-date={getDateKey(cellDate)}
                                                    aria-label={FULL_DATE_FORMATTER.format(cellDate)}
                                                    aria-current={isTodayDate ? "date" : undefined}
                                                    tabIndex={
                                                        isSelected ||
                                                        (!pendingDate && isTodayDate) ||
                                                        (!pendingDate && d.isCurrentMonth && d.day === 1)
                                                            ? 0
                                                            : -1
                                                    }
                                                    className={cn(
                                                        "flex h-11 w-full items-center justify-center rounded-base text-sm transition-brutal active:scale-90",
                                                        d.isCurrentMonth
                                                            ? "text-black font-medium"
                                                            : "text-black/60",
                                                        isSelected &&
                                                            "bg-main border-2 border-black font-bold text-black shadow-brutal",
                                                        !isSelected && d.isCurrentMonth && "hover:bg-main/20",
                                                        isTodayDate && !isSelected && "border-2 border-black/30"
                                                    )}
                                                >
                                                    {d.day}
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-2 border-t-2 border-black px-3 py-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="inline-flex h-11 items-center justify-center rounded-base border-2 border-black bg-white px-4 text-sm font-bold text-black transition-brutal active:scale-95 hover:bg-main/10 focus-brutal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleApply}
                                className="inline-flex h-11 items-center justify-center rounded-base border-2 border-black bg-black px-4 text-sm font-bold text-white transition-brutal active:scale-95 hover:bg-black/80 focus-brutal"
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
