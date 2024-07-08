import React from 'react';
import Link from 'next/link';
import { MdOutlineNotStarted } from "react-icons/md";

const Home = () => {
  return (
    <div className='w-full h-screen bg-slate-900 pt-[15%]'>
      <h1 className='text-center font-bold text-7xl text-[#28d492] mb-[2%]'>Welcome</h1>
      <Link href="/quiz" className='btn btn-outline btn-success ml-[41%] px-[3%]  mt-[2%] text-2xl '>Start Quiz<MdOutlineNotStarted className='ml-2 text-3xl' /></Link>
    </div>
  );
};

export default Home;
