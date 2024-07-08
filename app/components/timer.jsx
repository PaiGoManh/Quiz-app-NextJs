import React from 'react';

const Timer = ({ duration }) => {
  return (
    <div className='w-[70px] h-[50px] bg-gray-900 text-white flex items-center justify-center'>
      <span className='text-xl'>{duration}s</span>
    </div>
  );
};

export default Timer;
