import { useRef } from "react";
import XScrollableDiv from "../../components/XScrollableDiv/XScrollableDiv";

let startX = 0;
let scrollLeft = 0;
let direction = "right";

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const mouseMoveRef = useRef<boolean>(false);

  function animateScroll() {
    if (!containerRef.current || !mouseMoveRef.current) {
      return;
    }

    const step = 1;

    const scrollLeft = containerRef.current.scrollLeft;
    const targetScrollLeft =
      direction === "right"
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
    }, Math.floor(direction === "right" ? (targetScrollLeft - container.scrollLeft) / 10 : (container.scrollLeft - targetScrollLeft) / 10)); // Adjust this interval as needed
  }

  return (
    <div className="p-4 flex">
      <XScrollableDiv>
        {Array(12)
          .fill("")
          .map((_, i) => (
            <div
              onClick={() => alert("test")}
              className="w-[200px] h-full flex items-center justify-center bg-blue-300 border border-gray-500"
            >
              <span className="text-5xl font-bold">{i}</span>
            </div>
          ))}
      </XScrollableDiv>
    </div>
  );
};

export default AboutPage;
