"use client";
import React from 'react';
import NoSSR from 'react-no-ssr';
import Data from './Pages/data';
import Navbar from './Pages/navbar';
import { NextUIProvider } from "@nextui-org/system";

function Page() {
  return (
            <NoSSR>
    <NextUIProvider>
      <div>
        <Navbar />
          <Data />
      </div>
    </NextUIProvider>
            </NoSSR>
  );
}

export default Page;
