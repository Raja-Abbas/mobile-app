// navbar.jsx
"use client";
import React, { useState } from 'react';
import Github from '../../public/github-mark.svg';
import Image from 'next/image';
import StoreIcon from './StoreIcon/Main';

function Navbar({  }) {
  

  return (
    <div className='bg-white shadow-xl h-[120px] sticky top-0 z-20'>
      <div className='flex justify-between pe-10 items-center'>
        <div className='flex gap-0'>
          <div className='bg-black max-sm:hidden inline-flex pl-[140px] pt-[30px] shadow-2xl border border-gray-700 pr-[100px] -rotate-45 -ml-36'>
            <Image src={Github} alt='' />
          </div>
          <h1 className='flex max-sm:ml-4 items-center text-[50px] font-bold text-[#1e293b] uppercase'>Mobile Store</h1>
        </div>
        <StoreIcon />
      </div>
    </div>
  );
}

export default Navbar;
