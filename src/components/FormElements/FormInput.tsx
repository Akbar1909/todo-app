import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
  formInputSize?: "sm" | "lg";
  rounded?: boolean;
}

type FormInputRef = React.ComponentPropsWithRef<"input">["ref"];

/**
 * A forwardRef-enhanced input component designed for flexible form input fields within a React application.
 * It extends all native input properties and introduces additional props for customizing the size and border
 * radius of the input. The component uses Tailwind CSS for styling, enhanced with `twMerge` for conditional
 * and additional class name integration. This setup allows for responsive and theme-compatible design adjustments.
 *
 * @component
 * @example
 * // Example usage of the FormInput component with a large size and rounded edges
 * <FormInput formInputSize="lg" rounded placeholder="Type here..." />
 *
 * @param {Object} props - The properties passed to the FormInput component.
 * @param {string} [props.formInputSize="lg"] - Optional prop to define the size of the input; can be "sm" for small or "lg" for large.
 * @param {boolean} [props.rounded=false] - Optional prop to define if the input should have fully rounded borders.
 * @param {React.ComponentPropsWithoutRef<"input">} props - Inherits all native input props excluding ref, which is handled by forwardRef.
 * @param {React.Ref<HTMLInputElement>} ref - Ref forwarded to the input element to allow direct DOM access.
 *
 * @returns {React.ReactElement} A customized input field component.
 */

const FormInput = forwardRef(
  ({ formInputSize = "lg", ...props }: FormInputProps, ref: FormInputRef) => {
    return (
      <input
        {...props}
        ref={ref}
        className={twMerge([
          "disabled:bg-slate-100 border disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent",
          "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
          "transition duration-200 ease-in-out w-full text-sm border-slate-300/60 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80",
          formInputSize == "sm" && "text-xs py-1.5 px-2",
          formInputSize == "lg" && "text-lg py-1.5 px-4",
          props.rounded && "rounded-full",
          props.className,
        ])}
      />
    );
  }
);

export default FormInput;
