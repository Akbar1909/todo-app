import React, { ReactNode, FC, useRef, useEffect, useState } from "react";

interface FocusAbleListProps {
  children: ReactNode;
  index: number;
}

const options = {
  childList: true,
};

const FocusAbleList: FC<FocusAbleListProps> = ({ children, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<any>(null);

  useEffect(() => {
    const obs = new MutationObserver(function mCallback(mutations: any[]) {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          const { addedNodes } = mutation;

          if (addedNodes.length === 1) {
            console.log(addedNodes);
            (addedNodes[0] as HTMLDivElement).scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest",
            });
          }
        }
      }
    });
    setObserver(obs);
  }, []);

  useEffect(() => {
    if (!observer || !containerRef.current) return;

    observer.observe(containerRef.current, options);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer]);

  return (
    <div className="w-full h-full overflow-y-scroll" ref={containerRef}>
      {children}
    </div>
  );
};

export default FocusAbleList;
