"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props} />
  );
}

function TabsList({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-auto w-fit items-center justify-center rounded-lg p-1",
        className
      )}
      {...props} />
  );
}

function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200",
        "border-gray-300 bg-white/50 text-gray-700 shadow-sm",
        "dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-300",
        "hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700",
        "dark:hover:border-emerald-500 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400",
        "data-[state=active]:border-emerald-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-green-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/25",
        "dark:data-[state=active]:border-emerald-400 dark:data-[state=active]:from-emerald-500 dark:data-[state=active]:to-green-500 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-emerald-400/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props} />
  );
}

function TabsContent({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

