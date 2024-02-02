import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded lg:rounded-md text-2xs sm:text-xs 2xl:text-sm 3xl:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  transition-transform duration-200 active:scale-[0.98] shadow-sm hover:shadow-lg transition-all duration-200 select-none relative",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(94deg,#5676FE_1.8%,#479CFE_42.09%,#27EEFF_98.39%)] text-primary-foreground font-bold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-cusBlack/20 bg-background hover:bg-cusGray-300 hover:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 mxl:h-9 2xl:h-10 px-3 sm:px-4 py-2",
        sm: "h-9 rounded-md px-3",
        md: "py-1.5 lg:py-2 xl:py-2 3xl:py-2.5 rounded px-3 lg:px-5 2xl:px-7 3xl:px-10 text-2xs xl:text-xs 3xl:text-base",
        lg: "py-2.5 2xl:py-3.5 3xl:py-4 rounded lg:rounded-md px-3 xsm:px-6 2xl:px-8 text-2xs lg:text-xs 2xl:text-sm 3xl:text-base h-9 lg:h-10 2xl:h-11 3xl:h-12",
        icon: "size-9 lg:size-10 2xl:size-11 3xl:size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      asChild = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {loading && (
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-fit h-fit z-20">
            <Loader className="animate-spin" />
          </div>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
