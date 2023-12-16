"use client";
import React from 'react'
import Data from './Pages/data'
import Navbar from './Pages/navbar'
import {NextUIProvider} from "@nextui-org/system";

function page() {
  return (
        <NextUIProvider>
    <div>
      <Navbar />
      <Data />
    </div>
      </NextUIProvider>
  )
}

export default page