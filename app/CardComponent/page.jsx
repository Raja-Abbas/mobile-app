// page.jsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image'
import Home from '../../public/icons8-home-50.svg'
import { useRouter } from "next/navigation";
import Link from 'next/link';

function Page() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className='bg-gray-400 h-[100vh] flex justify-center items-center'>
      <div className='bg-white w-[60%] h-[60%] px-10 py-10 text-[20px] inline-flex flex-col gap-10 uppercase text-black'>
        
        <Link href='/'><Image src={Home} alt='' className='w-8 absolute right-0 top-0 mr-4 mt-4'/></Link>
      </div>
    </div>
  );
}

export default Page;
