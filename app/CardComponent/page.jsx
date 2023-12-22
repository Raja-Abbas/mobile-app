// page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Home from '../../public/icons8-home-50.svg';
import { useRouter } from "next/navigation";
import Link from 'next/link';

function Page() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Check if we are on the client side before using localStorage
    if (typeof window !== 'undefined') {
      const storedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
      if (storedProduct) {
        setSelectedProduct(storedProduct);
        // Clear the localStorage to avoid showing the same product on page reload
        localStorage.removeItem('selectedProduct');
      } else {
        // If there's no stored product, redirect back to the home page
        router.push('/CardComponent');
      }
    }
  }, [router]);

  const addToCart = (product) => {
    // Implement your logic to add the product to the cart
    console.log("Product added to cart:", product);
  };

  return (
    <div className='bg-cardcomponent h-[100vh] flex justify-center items-center'>
      <div className='bg-slate-800 w-[83.4%] h-[76%] px-4 flex items-center -mt-[10px] shadow-inner justify-center gap-10 2xl:gap-20 uppercase text-white text-[14px]'>
        <Image
          isBlurred
          alt={selectedProduct?.title}
          width={100}
          height={100}
          className="object-fit hover:scale-105 cursor-pointer ring ring-slate-500 h-[60%] w-[30%] p-0 m-0 items-center rounded-none flex justify-center transition-all"
          src={selectedProduct?.thumbnail}
        />
        <div className='flex flex-col gap-8 xl:text-[20px] lg:w-[40%] bg-transparent'>
          <p>Title: <span className='text-[#00FFFF] mt-4'>{selectedProduct?.title}</span></p>
          <p>Category: <span className='text-[#00FFFF] mt-4'>{selectedProduct?.category}</span></p>
          <p>Price: <span className='text-[#00FFFF] mt-4'>${selectedProduct?.price}</span></p>
          <p>Description:<br /> <span className='text-[#00FFFF] mt-4'>{selectedProduct?.description}</span></p>
          <button
            onClick={() => {
              addToCart(selectedProduct);
            }}
            className="h-[50px] text-[14px] mt-2 w-[200px] shadow-inner text-black hover:bg-sky-800 transition-all font-bold bg-[#00FFFF] px-4 py-2 items-center place-content-end content-end w-100 flex justify-center uppercase"
          >
            {cartItems.some((item) => item.id === selectedProduct.id)
              ? "Add Item"
              : "Add Item"}
          </button>
        </div>
        <Link href='/'>
          <Image src={Home} alt='' className='w-16 hover:bg-white transition-all ease-in-out rounded-full px-4 py-4 bg-[#00FFFF] absolute right-0 top-0 mr-6 mt-6' />
        </Link>
      </div>
    </div>
  );
}

export default Page;
