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
      { name: "ABOVE BOARD" },
      {
        name: "Coming in white, green, blue, pink and yellow out of the bag, put these on your birds for bigger scores",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "Whether you're making a move, or actually about to win, commit all of these - and not of the potato variety",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "When used correctly, this livestock can build habitats, advance your society, or bridge rival colonies",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "An orhpange that any kid would brag about, cardinal directions would barely get you a third of the way there",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
        isDailyDouble: true,
      },
      {
        name: "Too fantastical for your garden variety card game. Hope that just the right amount of people can read between the lines",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 2",
    questions: [
      { name: "HOOPING" },
      {
        name: "This dish features a savory broth, rice noodles, and often beef or chicken",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "A juniper based liquor",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "This honey lover lives in the Thousand Acre Woods",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "A wellness company and lifestyle brand that wants you to 'Nourish your Inner Aspect'",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
      },
      {
        name: "Sometimes better kept to yourself, there are endless amounts of these, the extremes of which you generally find online",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 3",
    questions: [
      { name: "ONE WORD SPORTS" },
      {
        name: "Airball",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "Icing",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "Dink",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "Albatross",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
      },
      {
        name: "Panna",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 4",
    questions: [
      { name: "FORMULAIC" },
      {
        name: "M1 * V1 = M2 * V2",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "z = a + bi",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "A + B = B + A",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "E = MC^2",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
        isDailyDouble: true,
      },
      {
        name: "F = -KX",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 5",
    questions: [
      { name: "ROTTEN BUT GOOD" },
      {
        name: "57% on RT. Are you username LadiesMan217? Where is the eBay item 21153?",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "79% on RT. Are you the billionaire owner of Apple? No. Okay, in that case you got no right to wear NB sneakers, ever.",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "37% on RT. Do you know what D.K. means? Donkey Kong?",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "62% on RT. 50 million dollars? Who do you think you have, Chelsea Clinton?",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
      },
      {
        name: "71% on RT. You think Einstein walked around thinkin' everyone was a bunch of dumb shits? Now you know why he helped build that bomb.",
        value: "$1000",
        drink: "10 Shots",
        isComplete: false,
      },
    ],
  },
  {
    topic: "TOPIC 6",
    questions: [
      { name: "WHO SAID IT" },
      {
        name: "I'm trying to do more cardio",
        value: "$200",
        drink: "2 Shots",
        isComplete: false,
      },
      {
        name: "Have you ever thought about training your neck?",
        value: "$400",
        drink: "4 Shots",
        isComplete: false,
      },
      {
        name: "I'm kinda down to play Wingspan",
        value: "$600",
        drink: "6 Shots",
        isComplete: false,
      },
      {
        name: "You're only allowed to play pickleball if you're 60 plus",
        value: "$800",
        drink: "8 Shots",
        isComplete: false,
      },
      {
        name: "Our team just doesn't have enough spacing. Nobody is ever open.",
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
