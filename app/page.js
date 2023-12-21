"use client";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import Data from "./Pages/Home/data";
import Navbar from "./Pages/Home/navbar";
import { NextUIProvider } from "@nextui-org/system";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Pages/Home/StoreIcon/rootReducer';

// Add custom styles to your component
const styles = `
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #0284c7;
    border-radius: 0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #6b7280;
  }
`;

// Use configureStore from @reduxjs/toolkit
const store = configureStore({
  reducer: rootReducer,
});

function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <Provider store={store}>
      <NextUIProvider>
        <style jsx>{styles}</style>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <main>
              <svg
                className="ip"
                viewBox="0 0 256 128"
                width="256px"
                height="128px"
                xmlns="http://www.w3.org/2000/svg"
              >
              </svg>
            </main>
          </div>
        ) : (
          <div className="font-sans">
            <Navbar />
            <Data />
          </div>
        )}
      </NextUIProvider>
    </Provider>
  );
}

export default Page;
