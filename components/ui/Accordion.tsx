"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  openItems: [],
  toggle: () => {},
});

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
}

export function Accordion({ children, className, type = "single" }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const toggle = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        }
        return type === "single" ? [value] : [...prev, value];
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={cn("border border-gray-200 rounded-lg dark:border-gray-700", className)} data-value={value}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

export function AccordionTrigger({ children, className, value }: AccordionTriggerProps) {
  const { openItems, toggle } = React.useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <button
      className={cn(
        "flex w-full items-center justify-between px-6 py-4 text-left text-base font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
        className
      )}
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn("h-5 w-5 text-gray-500 transition-transform duration-200", isOpen && "rotate-180")}
      />
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

export function AccordionContent({ children, className, value }: AccordionContentProps) {
  const { openItems } = React.useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  if (!isOpen) return null;

  return (
    <div className={cn("px-6 pb-4 text-sm text-gray-600 dark:text-gray-400", className)}>
      {children}
    </div>
  );
}
