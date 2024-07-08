import React from 'react';

const Score = ({ score,totalQuestions }) => {
  return (
    <div className='ml-[1%] w-[70px] h-[50px] bg-gray-900'>
      <h1 className='text-xl text-center pt-3'>{score}/{totalQuestions}</h1>
    </div>
  )
};

export default Score;
