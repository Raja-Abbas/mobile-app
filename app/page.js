"use client";
import 'tailwindcss/tailwind.css';
import React from 'react'
import Data from './Pages/data'
import Navbar from './Pages/navbar'
import { NextUIProvider } from "@nextui-org/system";

// Add custom styles to your component
const styles = `
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #6b7280;
  }
`;

function page() {
  return (
    <NextUIProvider>
      <style jsx>{styles}</style>
      <div className='font-sans'>
        <Navbar />
        <Data />
      </div>
    </NextUIProvider>
  );
}

export default page;
