"use client"

import * as React from "react"
import { Toast as BaseToast } from "@base-ui/react/toast"
import { cn } from "@/lib/utils"

type ToastProps = React.ComponentPropsWithoutRef<typeof BaseToast.Root>

const Toast = React.forwardRef<
    React.ComponentRef<typeof BaseToast.Root>,
    ToastProps
>(({ className, ...props }, ref) => (
    <BaseToast.Root
        ref={ref}
        className={cn(
            "group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-base border-2 border-black p-6 pr-8 shadow-brutal transition-all",
            className
        )}
        {...props}
    />
))
Toast.displayName = "Toast"

const ToastViewport = React.forwardRef<
    React.ElementRef<typeof BaseToast.Viewport>,
    React.ComponentPropsWithoutRef<typeof BaseToast.Viewport>
>(({ className, ...props }, ref) => (
    <BaseToast.Viewport
        ref={ref}
        className={cn(
            "fixed bottom-4 right-4 z-50 w-full max-w-sm flex",
            className
        )}
        {...props}
    />
))
ToastViewport.displayName = "ToastViewport"

const ToastAction = React.forwardRef<
    React.ElementRef<typeof BaseToast.Action>,
    React.ComponentPropsWithoutRef<typeof BaseToast.Action>
>(({ className, ...props }, ref) => (
    <BaseToast.Action
        ref={ref}
        className={cn(
            "inline-flex h-8 shrink-0 items-center justify-center rounded-base border-2 border-black bg-main px-3 text-sm font-medium text-black ring-offset-white transition-colors hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            className
        )}
        {...props}
    />
))
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef<
    React.ElementRef<typeof BaseToast.Close>,
    React.ComponentPropsWithoutRef<typeof BaseToast.Close>
>(({ className, ...props }, ref) => (
    <BaseToast.Close
        ref={ref}
        className={cn(
            "absolute right-2 top-2 rounded-base p-1 text-black/50 opacity-0 transition-opacity hover:text-black focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
            className
        )}
        toast-close=""
        {...props}
    >
        ×
    </BaseToast.Close>
))
ToastClose.displayName = "ToastClose"

const ToastTitle = React.forwardRef<
    React.ElementRef<typeof BaseToast.Title>,
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
    React.ElementRef<typeof BaseToast.Description>,
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

type ToasterProps = {
    children?: React.ReactNode
}

const ToastRenderer = () => {
    const { toasts } = BaseToast.useToastManager()

    return (
        <BaseToast.Portal>
            <ToastViewport>
                {toasts.map((toast) => (
                    <BaseToast.Root
                        key={toast.id}
                        toast={toast}
                        swipeDirection={['down', 'right']}
                        className={cn(
                            "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
                            "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full origin-bottom",
                            "transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
                            "rounded-base border-2 bg-white bg-clip-padding p-6 pr-8 shadow-brutal select-none",
                            "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
                            "data-ending-style:opacity-0",
                            "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
                            "data-limited:opacity-0",
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
                            "h-[var(--height)] data-expanded:h-[var(--toast-height)]",
                            "transition-[transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
                            "data-[type=success]:bg-mint data-[type=success]:text-black",
                            "data-[type=error]:bg-hot-pink data-[type=error]:text-white",
                            "data-[type=warning]:bg-lemon data-[type=warning]:text-black",
                            "data-[type=info]:bg-main data-[type=info]:text-black"
                        )}
                    >
                        <BaseToast.Content className="overflow-hidden transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
                            <BaseToast.Title className="text-sm font-semibold" />
                            <BaseToast.Description className="text-sm opacity-90" />
                            <BaseToast.Close className="absolute right-2 top-2 rounded-base p-1 text-black/50 transition-opacity hover:text-black focus:opacity-100 focus:outline-none focus:ring-2" aria-label="Close">
                                ×
                            </BaseToast.Close>
                        </BaseToast.Content>
                    </BaseToast.Root>
                ))}
            </ToastViewport>
        </BaseToast.Portal>
    )
}

const Toaster = () => {
    return (
        <ToastProvider toastManager={toastManager}>
            <ToastRenderer />
        </ToastProvider>
    )
}

// Create a global toast manager for imperative API
const toastManager = BaseToast.createToastManager()

export const toast = {
    success: (message: string, options?: any) =>
        toastManager.add({ description: message, type: "success", ...options }),
    error: (message: string, options?: any) =>
        toastManager.add({ description: message, type: "error", ...options }),
    info: (message: string, options?: any) =>
        toastManager.add({ description: message, type: "info", ...options }),
    warning: (message: string, options?: any) =>
        toastManager.add({ description: message, type: "warning", ...options }),
    promise: toastManager.promise,
    dismiss: (toastId: string) => toastManager.close(toastId),
}

export {
    type ToastProps,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
    Toaster,
    toast,
}
