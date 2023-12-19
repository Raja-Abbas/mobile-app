"use client";
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import Data from "./Pages/data";
import Navbar from "./Pages/navbar";
import { NextUIProvider } from "@nextui-org/system";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Pages/StoreIcon/rootReducer';

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

const store = createStore(rootReducer);

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
          <div className="flex justify-center items-center h-screen">
            <main>
              <svg
                className="ip"
                viewBox="0 0 256 128"
                width="256px"
                height="128px"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... (your SVG content) */}
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
