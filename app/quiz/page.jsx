'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Question from '../components/question';
import Timer from '../components/timer';
import Score from '../components/score';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); 

  const router = useRouter(); 

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/questions.json');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();

        setQuestions(
          data.map((question) => ({
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
          }))
        );
      } catch (err) {
        console.error('Failed to load questions:', err);
        setError('Failed to load questions. Please try again later.');
      }
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestionIndex]);

  const handleSelectOption = (selectedOption) => {
    setSelectedAnswer(selectedOption);
  };

  const nextQuestion = () => {
    const correctAnswer = questions[currentQuestionIndex]?.correctAnswer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);

    setSelectedAnswer(null); 

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const queryString = new URLSearchParams({
        questions: JSON.stringify(questions),
        answers: JSON.stringify(updatedAnswers),
        score: score.toString(),
      }).toString();
      router.push(`/summary?${queryString}`);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(30); 
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='bg-black w-full h-screen text-white'>
      <div className='w-full pt-2 flex gap-[2%]'>
        <Score score={score} totalQuestions={questions.length} />
        <Timer duration={timeLeft} />
      </div>
      <div>
        {currentQuestion && (
          <>
            <Question
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedAnswer={selectedAnswer}
              onSelectOption={handleSelectOption}
            />
            <div className="join grid grid-cols-2 w-[200px] ml-[80%] pt-[1%]">
              <button className="join-item btn btn-outline"
                onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)}
              >
                Previous
              </button>
              <button className="join-item btn btn-outline" onClick={nextQuestion}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
