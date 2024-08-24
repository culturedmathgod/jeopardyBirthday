import React from "react";
import classNames from "classnames";
import type { SingleQuestion } from "../pages/play";

type QuestionCard = SingleQuestion & {
  topic: string;
  className?: string;
  setActive: (question: SingleQuestion, topic: string) => void;
};

export const QuestionCard: React.FC<QuestionCard> = (props) => {
  const {
    name,
    value,
    drink,
    topic,
    isComplete,
    isDailyDouble,
    className,
    setActive,
  } = props;

  const handleActive = () => {
    setActive(
      {
        name: name,
        value: value,
        isComplete: isComplete,
        isDailyDouble: isDailyDouble,
      },
      topic
    );
  };

  return (
    <>
      {isComplete && (
        <div className="text-shadow-md flex h-full cursor-pointer items-center justify-center border-2 border-black text-[50px] font-bold text-[#d69f4c]"></div>
      )}
      {!isComplete && (
        <div
          onClick={handleActive}
          className={classNames(
            className,
            "flex h-full cursor-pointer flex-col items-center justify-center border-2 border-black"
          )}
        >
          <span className="text-shadow-md my-4 text-[70px] font-bold leading-[70px] text-[#d69f4c]">
            {value}
          </span>
          {/* <span className="text-shadow text-[20px] text-white">{drink}</span> */}
        </div>
      )}
    </>
  );
};
