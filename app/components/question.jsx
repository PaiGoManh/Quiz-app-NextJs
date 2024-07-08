import React from 'react';

const Question = ({ question, options, onSelectOption,selectedAnswer }) => {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

  return (
    <div className='w-[1270px] h-[500px] bg-gray-900 ml-[1%] mt-[1%] p-4'>
      <h2 className='text-center pt-8 text-5xl text-white'>{question}</h2>
      <div className='flex flex-wrap gap-[3%] pt-[10%] pl-[5%] w-full'>
        {options.map((option, index) => (
          <div
            key={index}
            className={` w-[250px] h-[200px] flex items-center justify-center text-white font-bold rounded-lg cursor-pointer hover:opacity-75 text-2xl transition duration-300 ${colors[index % colors.length]}${selectedAnswer === option ? 'border-4 border-white' : ''}`}
            onClick={() => onSelectOption(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
