// page.jsx
'use client';
import React, { useState } from 'react';

function Page() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className='bg-gray-400 h-[100vh] flex justify-center items-center'>
      <div className='bg-white w-[60%] h-[60%] px-10 py-10 text-[20px] inline-flex flex-col gap-10 uppercase text-white'>
        {selectedProduct ? (
          <>
            <h1 className='bg-black px-6 py-3 inline-flex w-fit rounded-xl'>
              Title: {selectedProduct.title}
            </h1>
            <h2 className='bg-black px-6 py-3 inline-flex w-fit rounded-xl'>
              Category: {selectedProduct.category}
            </h2>
          </>
        ) : (
          <p>Select a product to see details</p>
        )}
      </div>
    </div>
  );
}

export default Page;
