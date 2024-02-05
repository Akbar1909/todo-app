import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "size" | "className"> {
  className?: string;
  children: ReactNode;
}

/**
 * Button Component
 *
 * This component renders a button with pre-defined Tailwind CSS classes for styling
 * and accepts additional Tailwind CSS classes via the `className` prop. It extends
 * all native button properties except for `size` and `className` to allow for custom
 * functionality and styling. The component utilizes the `twMerge` function from
 * `tailwind-merge` to intelligently merge Tailwind CSS class names, ensuring that
 * styling conflicts are handled gracefully.
 *
 * @component
 * @example
 * // Renders a Button with default styling and custom class
 * <Button className="m-2">Click Me</Button>
 *
 * @param {Object} props - Props for Button component
 * @param {ReactNode} props.children - The content of the button.
 * @param {string} [props.className] - Optional custom Tailwind CSS classes to apply to the button.
 * @param {Omit<React.ComponentPropsWithoutRef<"button">, "size" | "className">} props - Inherits all native button props except `size` and `className`.
 *
 * @returns {React.ReactElement} A Button component with applied Tailwind CSS and custom classes.
 */

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
