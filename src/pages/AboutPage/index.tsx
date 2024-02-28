import { useState } from "react";
import FocusAbleList from "../../components/FocusabeList";
import XScrollableDiv from "../../components/XScrollableDiv/XScrollableDiv";

const AboutPage = () => {
  const [data, setData] = useState({
    1: Array(20).fill(""),
    2: Array(20).fill(""),
  });

  const appendItem = () =>
    setData((prev) => ({ ...prev, 1: [...prev["1"], ""] }));

  return (
    <div className="p-4 flex">
      <button onClick={appendItem}>Append</button>
      <XScrollableDiv>
        {Object.entries(data).map(([key, value], i) => (
          <div
            key={i}
            className="w-[200px] h-full flex items-center justify-center bg-blue-300 border border-gray-500"
          >
            <FocusAbleList index={i}>
              {value.map((_, j) => (
                <div
                  id={`id-${i}-${j}`}
                  data-id={j}
                  key={j}
                  className="w-full h-10 border border-purple-400"
                >
                  {j}
                </div>
              ))}
            </FocusAbleList>
          </div>
        ))}
      </XScrollableDiv>
    </div>
  );
};

export default AboutPage;
