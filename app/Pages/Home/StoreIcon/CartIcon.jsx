import React from "react";
import Image from 'next/image'
import ImageStore from '../../../../public/store.png'
export const CartIcon = ({ size, height, width, ...props }) => {
  return (
    <Image src={ImageStore} alt="" className="h-10 w-10 flex justify-end"/>
  );
};
