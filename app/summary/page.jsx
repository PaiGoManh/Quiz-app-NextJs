'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'next-share';

const Summary = () => {
  const searchParams = useSearchParams();
  const questions = searchParams.get('questions');
  const answers = searchParams.get('answers');
  const score = searchParams.get('score');

  if (!questions || !answers || !score) {
    return <div>Loading...</div>;
  }

  const parsedQuestions = JSON.parse(questions);
  const parsedAnswers = JSON.parse(answers);
  const totalQuestions = parsedQuestions.length;
  let correctAnswers = 0;

  parsedQuestions.forEach((question, index) => {
    if (parsedAnswers[index] === question.correctAnswer) {
      correctAnswers++;
    }
  });

  const router = useRouter();

  return (
    <div className='bg-black w-full h-screen text-white flex flex-col items-center justify-center'>
      <div className='w-full max-w-3xl p-4'>
        <h1 className='text-4xl font-bold mb-4 text-center'>Quiz Summary</h1>
        <div className="flex w-full flex-col gap-4 ml-[20%] pt-[2%]">
          <div className="flex items-center gap-4">
            <div className="bg-cover bg-center bg-no-repeat h-[125px] w-[125px] shrink-0 rounded-full  items-center justify-center text-xl font-bold text-white bg-gray-900">
              <h1 className='mt-10 ml-2'>Your Score</h1>
              <h1 className='text-center text-3xl mt-1'>{correctAnswers}</h1>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold ml-[10%] pl-2 bg-gray-900 w-[200px] rounded-xl">Correct {correctAnswers}</div>
              <div className="text-lg font-semibold ml-[10%] pl-2 bg-gray-900 w-[200px] rounded-xl">Total {totalQuestions}</div>
            </div>
          </div>
          <div className='bg-gray-800 p-4 rounded-lg w-[500px] h-[280px] overflow-y-auto'>
            {parsedQuestions.map((question, index) => (
              <div key={index} className='mb-4'>
                <h3 className='text-xl font-bold'>{question.question}</h3>
                <p className='mt-1 text-[red]'><span className='font-semibold'>Your answer:</span> {parsedAnswers[index]}</p>
                <p className='text-[green]'><span className='font-semibold '>Correct answer:</span> {question.correctAnswer}</p>
              </div>
            ))}
          </div>
          <div className='flex gap-[8%] ml-[2%]'>
            <button
              className='mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-[200px]'
              onClick={() => router.push('/quiz')}
            >
              Restart Quiz
            </button>
            <div className="mt-4 flex gap-2">
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
