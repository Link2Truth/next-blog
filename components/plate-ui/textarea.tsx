import React from "react";

import { withVariants } from "@udecode/cn";
import { type VariantProps, cva } from "class-variance-authority";

export const textareaVariants = cva(
  "flex w-full rounded-md bg-transparent text-base file:border-0 file:bg-background file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    defaultVariants: {
      h: "md",
      variant: "default",
    },
    variants: {
      h: {
        md: "h-20 px-3 py-2",
        sm: "h-10 px-1.5 py-1",
      },
      variant: {
        default:
          "border border-textarea ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        ghost: "border-none focus-visible:ring-transparent",
      },
    },
  },
);

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> &
  VariantProps<typeof textareaVariants>;

export const Textarea = withVariants("textarea", textareaVariants, [
  "variant",
  "h",
]);

export type FloatingTextareaProps = TextareaProps & {
  label: string;
};

export function FloatingTextarea({
  id,
  className,
  label,
  ...props
}: FloatingTextareaProps) {
  return (
    <>
      <label
        className="absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:top-0 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium has-[+textarea:not(:placeholder-shown)]:text-foreground"
        htmlFor={id}
      >
        <span className="inline-flex bg-background px-2">{label}</span>
      </label>
      <Textarea id={id} className={className} placeholder="" {...props} />
    </>
  );
}
