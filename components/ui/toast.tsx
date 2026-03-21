"use client"

import * as React from "react"
import { Toast as BaseToast } from "@base-ui/react/toast"
import { cn } from "@/lib/utils"

type ToastPosition =
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"

interface ToastOptions {
    title?: React.ReactNode
    description?: React.ReactNode
    timeout?: number
    priority?: "low" | "high"
    onClose?: () => void
    onRemove?: () => void
    actionProps?: React.ComponentPropsWithoutRef<"button">
}

interface ToastPromiseOptions<Value> {
    loading: string | ToastOptions
    success: string | ToastOptions | ((result: Value) => string | ToastOptions)
    error: string | ToastOptions | ((error: unknown) => string | ToastOptions)
}

type ToastProps = React.ComponentPropsWithoutRef<typeof BaseToast.Root>

interface ToasterProps {
    position?: ToastPosition
}

const VIEWPORT_POSITIONS: Record<ToastPosition, string> = {
    "top-left": "fixed top-4 left-4 z-50 w-full max-w-sm flex",
    "top-right": "fixed top-4 right-4 z-50 w-full max-w-sm flex",
    "top-center": "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm flex",
    "bottom-left": "fixed bottom-4 left-4 z-50 w-full max-w-sm flex",
    "bottom-right": "fixed bottom-4 right-4 z-50 w-full max-w-sm flex",
    "bottom-center": "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm flex",
}

function getSwipeDirection(
    position: ToastPosition,
): ("up" | "down" | "left" | "right")[] {
    const isTop = position.startsWith("top")
    const isLeft = position.includes("left")
    const isCenter = position.includes("center")
    if (isCenter) return isTop ? ["up"] : ["down"]
    if (isLeft) return isTop ? ["up", "left"] : ["down", "left"]
    return isTop ? ["up", "right"] : ["down", "right"]
}

const COMMON_TOAST_CLASSES = [
    "[--gap:0.75rem]",
    "[--peek:0.75rem]",
    "[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
    "[--shrink:calc(1-var(--scale))]",
    "[--height:var(--toast-frontmost-height,var(--toast-height))]",
    "absolute w-full z-[calc(1000-var(--toast-index))]",
    "rounded-base border-2 bg-white bg-clip-padding p-6 pr-8 shadow-brutal select-none",
    "after:absolute after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
    "data-ending-style:opacity-0",
    "data-limited:opacity-0",
    "h-(--height) data-expanded:h-(--toast-height)",
    "transition-[transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
    "data-[type=success]:bg-mint data-[type=success]:text-black",
    "data-[type=error]:bg-hot-pink data-[type=error]:text-white",
    "data-[type=warning]:bg-lemon data-[type=warning]:text-black",
    "data-[type=info]:bg-main data-[type=info]:text-black",
].join(" ")

const BOTTOM_TOAST_CLASSES = [
    "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
    "bottom-0 origin-bottom",
    "transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
    "after:top-full",
    "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
    "data-starting-style:transform-[translateY(150%)]",
    "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]",
    "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
    "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
    "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
    "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
    "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
    "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
    "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
    "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
].join(" ")

const TOP_TOAST_CLASSES = [
    "[--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))]",
    "top-0 origin-top",
    "transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))]",
    "after:bottom-full",
    "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
    "data-starting-style:transform-[translateY(-150%)]",
    "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)]",
    "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
    "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
    "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
    "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
    "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
    "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
    "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
    "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
].join(" ")

function resolvePromisePhase(
    option: string | ToastOptions,
    defaultType: string,
) {
    if (typeof option === "string") {
        return { title: option, type: defaultType }
    }
    return { type: defaultType, ...option }
}

const Toast = React.forwardRef<
    React.ComponentRef<typeof BaseToast.Root>,
    ToastProps
>(({ className, ...props }, ref) => (
    <BaseToast.Root
        ref={ref}
        className={cn(
            "group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-base border-2 border-black p-6 pr-8 shadow-brutal transition-[transform,opacity,box-shadow,background-color,color] duration-200",
            className,
        )}
        {...props}
    />
))
Toast.displayName = "Toast"

const ToastViewport = React.forwardRef<
    React.ComponentRef<typeof BaseToast.Viewport>,
    React.ComponentPropsWithoutRef<typeof BaseToast.Viewport>
>(({ className, ...props }, ref) => (
    <BaseToast.Viewport
        ref={ref}
        className={cn(
            "fixed bottom-4 right-4 z-50 w-full max-w-sm flex",
            className,
        )}
        {...props}
    />
))
ToastViewport.displayName = "ToastViewport"

const ToastAction = React.forwardRef<
    React.ComponentRef<typeof BaseToast.Action>,
    React.ComponentPropsWithoutRef<typeof BaseToast.Action>
>(({ className, ...props }, ref) => (
    <BaseToast.Action
        ref={ref}
        className={cn(
            "inline-flex h-8 shrink-0 items-center justify-center rounded-base border-2 border-black bg-white px-3 text-sm font-bold text-black shadow-brutal-sm transition-brutal hover:translate-x-px hover:translate-y-px hover:shadow-none focus-brutal disabled:pointer-events-none disabled:opacity-50",
            className,
        )}
        {...props}
    />
))
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef<
    React.ComponentRef<typeof BaseToast.Close>,
    React.ComponentPropsWithoutRef<typeof BaseToast.Close>
>(({ className, ...props }, ref) => (
    <BaseToast.Close
        ref={ref}
        className={cn(
            "absolute right-2 top-2 rounded-base p-1 text-black/50 opacity-0 transition-opacity hover:text-black focus-visible:opacity-100 focus-brutal group-hover:opacity-100",
            className,
        )}
        toast-close=""
        {...props}
    >
        ×
    </BaseToast.Close>
))
ToastClose.displayName = "ToastClose"

const ToastTitle = React.forwardRef<
    React.ComponentRef<typeof BaseToast.Title>,
    React.ComponentPropsWithoutRef<typeof BaseToast.Title>
>(({ className, ...props }, ref) => (
    <BaseToast.Title
        ref={ref}
        className={cn("text-sm font-semibold", className)}
        {...props}
    />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
    React.ComponentRef<typeof BaseToast.Description>,
    React.ComponentPropsWithoutRef<typeof BaseToast.Description>
>(({ className, ...props }, ref) => (
    <BaseToast.Description
        ref={ref}
        className={cn("text-sm opacity-90", className)}
        {...props}
    />
))
ToastDescription.displayName = "ToastDescription"

type ToastProviderProps = React.ComponentProps<typeof BaseToast.Provider>

const ToastProvider = ({ ...props }: ToastProviderProps) => {
    return <BaseToast.Provider {...props} />
}

const ToastRenderer = ({ position }: { position: ToastPosition }) => {
    const { toasts } = BaseToast.useToastManager()
    const isTop = position.startsWith("top")
    const positionClasses = isTop ? TOP_TOAST_CLASSES : BOTTOM_TOAST_CLASSES

    return (
        <BaseToast.Portal>
            <ToastViewport className={VIEWPORT_POSITIONS[position]}>
                {toasts.map((t) => (
                    <BaseToast.Root
                        key={t.id}
                        toast={t}
                        swipeDirection={getSwipeDirection(position)}
                        className={cn(COMMON_TOAST_CLASSES, positionClasses)}
                    >
                        <BaseToast.Content className="flex flex-col gap-1 overflow-hidden transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
                            <BaseToast.Title className="text-sm font-semibold" />
                            <BaseToast.Description className="text-sm opacity-90" />
                            {t.actionProps && (
                                <div className="mt-1">
                                    <BaseToast.Action
                                        className="inline-flex h-7 shrink-0 items-center justify-center rounded-base border-2 border-black bg-white px-3 text-xs font-bold text-black shadow-brutal-sm transition-brutal hover:translate-x-px hover:translate-y-px hover:shadow-none focus-brutal disabled:pointer-events-none disabled:opacity-50"
                                        {...t.actionProps}
                                    />
                                </div>
                            )}
                            <BaseToast.Close
                                className="absolute right-2 top-2 rounded-base p-1 text-black/80 transition-opacity hover:text-black focus-visible:opacity-100 focus-brutal"
                                aria-label="Close"
                            >
                                ×
                            </BaseToast.Close>
                        </BaseToast.Content>
                    </BaseToast.Root>
                ))}
            </ToastViewport>
        </BaseToast.Portal>
    )
}

const Toaster = ({ position = "bottom-right" }: ToasterProps) => {
    return (
        <ToastProvider toastManager={toastManager}>
            <ToastRenderer position={position} />
        </ToastProvider>
    )
}

const toastManager = BaseToast.createToastManager()

export const toast = {
    success: (message: string, options?: ToastOptions) =>
        toastManager.add({ description: message, type: "success", ...options }),
    error: (message: string, options?: ToastOptions) =>
        toastManager.add({ description: message, type: "error", ...options }),
    info: (message: string, options?: ToastOptions) =>
        toastManager.add({ description: message, type: "info", ...options }),
    warning: (message: string, options?: ToastOptions) =>
        toastManager.add({ description: message, type: "warning", ...options }),
    promise: <Value,>(
        promiseValue: Promise<Value>,
        options: ToastPromiseOptions<Value>,
    ) => {
        const { loading, success, error } = options
        return toastManager.promise(promiseValue, {
            loading: resolvePromisePhase(loading, "info"),
            success:
                typeof success === "function"
                    ? (result: Value) =>
                          resolvePromisePhase(success(result), "success")
                    : resolvePromisePhase(success, "success"),
            error:
                typeof error === "function"
                    ? (err: unknown) =>
                          resolvePromisePhase(error(err), "error")
                    : resolvePromisePhase(error, "error"),
        })
    },
    dismiss: (toastId: string) => toastManager.close(toastId),
}

export {
    type ToastPosition,
    type ToastProps,
    type ToastOptions,
    type ToastPromiseOptions,
    type ToasterProps,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
    Toaster,
}
