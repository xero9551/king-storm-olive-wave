import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "border-border bg-secondary text-muted-foreground",
        high: "border-high/30 bg-high/15 text-high",
        low: "border-low/30 bg-low/15 text-low",
        ok: "border-ok/30 bg-ok/15 text-ok",
        signal: "border-signal/30 bg-signal/15 text-signal",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
