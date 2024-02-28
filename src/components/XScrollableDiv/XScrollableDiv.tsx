import { useRef, FC, ReactNode, ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type SpeedVariant = "slow" | "standard" | "fast";

interface XScrollableDivProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  enableVelocity?: boolean;
  speedVariant?: SpeedVariant;
  speed?: number;
  replaceCursorStyle?: boolean;
}

const speedVariants: Record<SpeedVariant, number> = {
  slow: 2,
  standard: 3,
  fast: 5,
};

/**
 * A horizontal scrollable div component with velocity scrolling.
 * @param {Object} props - The props for the component.
 * @param {ReactNode} props.children - The content to be rendered inside the scrollable div.
 * @param {string} [props.className] - Additional CSS classes to be applied to the div.
 * @param {boolean} [props.enableVelocity=true] - If true, enables velocity scrolling.
 * @param {SpeedVariant} [props.speedVariant="standard"] - The speed variant for velocity scrolling.
 * @param {number} [props.speed] - The custom speed for velocity scrolling (overrides speedVariant).
 * @param {boolean} [props.replaceCursorStyle=true] - If true, replaces the cursor style during dragging.
 * @returns {JSX.Element} - The JSX element representing the scrollable div.
 */

const XScrollableDiv: FC<XScrollableDivProps> = ({
  children,
  className,
  enableVelocity = true,
  speedVariant = "standard",
  speed,
  replaceCursorStyle = true,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const mouseMoveRef = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef(0);
  const direction = useRef<"left" | "right">("right");

  function animateScroll() {
    if (!containerRef.current || !mouseMoveRef.current) {
      return;
    }

    const step = 1;

    const scrollLeft = containerRef.current.scrollLeft;
    const targetScrollLeft =
      direction.current === "right"
        ? Math.min(
            containerRef.current.scrollWidth - containerRef.current.clientWidth,
            scrollLeft + 50
          )
        : scrollLeft === 0
        ? 0
        : Math.max(scrollLeft - 50, 0);
    const container = containerRef.current;

    const animation = setInterval(() => {
      if (container.scrollLeft === targetScrollLeft) {
        clearInterval(animation);
      } else if (container.scrollLeft < targetScrollLeft) {
        container.scrollLeft += step;
      } else {
        container.scrollLeft -= step;
      }
    }, Math.floor(direction.current === "right" ? (targetScrollLeft - container.scrollLeft) / 10 : (container.scrollLeft - targetScrollLeft) / 10)); // Adjust this interval as needed
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={(event) => {
        if (!containerRef.current) {
          return;
        }

        if (replaceCursorStyle) {
          containerRef.current.style.cursor = "grabbing";
        }

        isMouseDownRef.current = true;
        mouseMoveRef.current = false;
        startX.current = event.pageX - (containerRef.current?.offsetLeft || 0);
        scrollLeft.current = containerRef.current?.scrollLeft || 0;
      }}
      onMouseMove={(event) => {
        event.preventDefault();
        mouseMoveRef.current = true;

        if (!containerRef.current || !isMouseDownRef.current) {
          return;
        }

        const x = event.pageX - (containerRef.current?.offsetLeft || 0);
        const walk =
          (x - startX.current) *
          (typeof speed === "number" ? speed : speedVariants[speedVariant]);
        direction.current = walk > 0 ? "left" : "right";

        containerRef.current.scrollLeft = scrollLeft.current - walk;
      }}
      onMouseUp={() => {
        isMouseDownRef.current = false;
        if (!containerRef.current || !enableVelocity) {
          return;
        }

        if (replaceCursorStyle) {
          containerRef.current.style.cursor = "default";
        }
        animateScroll();
      }}
      className={twMerge(
        "h-[400px] flex flex-wrap flex-col overflow-x-auto w-[600px] border border-red-5s00",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default XScrollableDiv;
