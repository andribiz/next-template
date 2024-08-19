"use client";
import { Button, type ButtonProps } from "@template/ui/button";
import { Icons } from "@template/ui/icon";
import { cn } from "@template/ui/lib";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  className,
  children,
  ...props
}: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      disabled={props.disabled ? props.disabled : pending}
      className={cn(className, "relative")}
    >
      <span className={cn(pending ? "opacity-0" : "")}>{children}</span>
      {pending ? (
        <div className="absolute inset-0 grid place-items-center">
          <Icons.spinner className="h-6 w-6 animate-spin" />
        </div>
      ) : null}
    </Button>
  );
};
