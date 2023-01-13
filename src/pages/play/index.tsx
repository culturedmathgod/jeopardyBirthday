import React, { useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { CategoryCard } from "../../components/CategoryCard";
import { QuestionCard } from "../../components/QuestionCard";
import { ActiveQuestionCard } from "../../components/ActiveQuestionCard";

export type SingleQuestion = {
  name: string;
  value?: string;
  drink?: string;
  isComplete?: boolean;
  isDailyDouble?: boolean;
};

type Question = {
  topic: string;
  questions: SingleQuestion[];
};

const topics: Question[] = [
  {
    topic: "TOPIC 1",
    questions: [
      { name: "SPORTY MATH" },
      {
        name: "Points for a touchdown divided by points for a slam dunk",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "Majors in golf times majors in tennis",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "Shortest olympic swmmming distance plus soccer penalty area distance in yards",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "Qualifying teams to the group stage in the World Cup plus qualifying teams to the group stage to worlds for League of Legends",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
        isDailyDouble: true,
      },
      {
        name: "Baseball roster size minus feathers in a shuttlecock",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 2",
    questions: [
      { name: "2022" },
      {
        name: "This eccentric billionaire bought this tech company for 44 billion dollars, sporting larry the bird as its iconic logo",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "going public in 1980, this tech company is the first ever to achieve a 3 trillion dollar valuation through its ability to think differently",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "declared time person of the year in 2022, this first term president is currently at war with the largest country",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "36 years between sequels, this film grossed the second most worldwide",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
      },
      {
        name: "the longest reign of any british monarch, owned by queen elizabeth II after her passing",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 3",
    questions: [
      { name: "STARTS WITH MAN" },
      {
        name: "To take care of one's business. To succeed in attaining one's goals",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "an aspirational endeavor that tends to go nowhere, much like its show on netflix",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "Read from right to left",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "What you do when caught in a lie. Requiring skill and care",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
      },
      {
        name: "Lifting weights, eating big, becoming educated",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 4",
    questions: [
      { name: "VIDEO GAMES" },
      {
        name: "Tennis, Baseball, Bowling, Golf, Boxing",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "in this game you first receive a small fishing net on its tutorial island",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "at 2 stars the cops shoot to kill. at 4, expect the SWAT team",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "800 points if you do it once, 1200 points if you do it back to back. 2 controls are all you need",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
        isDailyDouble: true,
      },
      {
        name: "in 2020, it was time to find 'new horizons' and build your own island paradise with this switch game",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 5",
    questions: [
      { name: "WORDS IN GAMES NIGHT" },
      {
        name: "organized group",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "warm result",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "mythical creature",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "complex puzzle",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
      },
      {
        name: "lawfully confined",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 6",
    questions: [
      { name: "STUPID ANSWERS" },
      {
        name: "In the 'Shrek' movies, it's the name of the donkey voiced by eddie murphy",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "In this 1997 film jack nicholson asks a group of psychiatric patients, “What if this is as good as it gets?”",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "Before co-starring in 'Get Out', allison williams played one of the girls on this hbo series",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "Launched in 1990 this weekly magazine from Time Inc. covers all aspects of the entertainment industry",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
      },
      {
        name: "Sometimes you have to peel cheese off this shovel-like implement used to place pizza in & out of an oven",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
];

const Home: NextPage = () => {
  const [isQuestion, setIsQuestion] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<SingleQuestion | null>(
    null
  );
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>(topics);

  const completeQuestion = (question: SingleQuestion, topic: string) => {
    const tempQuestions = [...questions];
    const topicIndex = tempQuestions.findIndex((t) => t.topic === topic);
    if (topicIndex > -1) {
      const questionIndex = tempQuestions[topicIndex]?.questions.findIndex(
        (q) => q.name === question.name
      );
      if (questionIndex && questionIndex > -1) {
        tempQuestions[topicIndex]!.questions[questionIndex] = {
          ...question,
          isComplete: true,
        };
      }
    }
    setQuestions([...tempQuestions]);
  };

  const handleActivateQuestion = (question: SingleQuestion, topic: string) => {
    setCurrentQuestion(question);
    setCurrentTopic(topic);
    setIsQuestion(true);
  };

  return (
    <>
      <Head>
        <title>JEOPARDY</title>
        <meta name="description" content="hey whats gucci" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex-col bg-[#18168F] font-jeopardy text-white">
        <div className="mx-auto flex h-screen w-full max-w-[1700px] flex-col">
          {isQuestion && (
            <ActiveQuestionCard
              question={currentQuestion}
              topic={currentTopic}
              setActive={setIsQuestion}
              completeQuestion={completeQuestion}
            />
          )}
          {!isQuestion && (
            <div className="flex h-full items-center justify-center">
              <div className="grid grid-flow-col grid-cols-6 grid-rows-6 border-[6px] border-black">
                {questions.map((topic, j) =>
                  topic.questions.map((question, i) => {
                    return (
                      <div key={question.name} className="">
                        {i === 0 ? (
                          <CategoryCard title={question.name} index={j} />
                        ) : (
                          <QuestionCard
                            {...question}
                            setActive={handleActivateQuestion}
                            topic={topic.topic}
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
