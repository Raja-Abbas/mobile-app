// Modal.jsx
import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { addToCart } from "./StoreIcon/cartActions";

const Modal = ({ isOpen, closeModal, product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product));
    closeModal(); // Close the modal after adding to the cart
  };

  if (!isOpen) return null;

  return (
    <div className="fixed border border-black top-1/2 bg-white rounded-lg shadow-3xl  left-1/2 transform z-50 animate-drip-expand -translate-x-1/2 -translate-y-1/2 h-fit w-fit flex max-lg:flex-col items-center px-6">
      <div className="p-8 rounded-lg flex flex-col w-[300px] justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <p className="w-full text-xl uppercase font-bold px-2 py-2 rounded-lg text-center">
          {product.category}
        </p>
        <div className="flex w-full -mt-2 items-center justify-between">
          <small className="text-md px-2 uppercase rounded-lg text-center ">
            {product.title}
          </small>
          <small className="text-lg inline-flex bg-sky-600 px-2 text-white rounded-lg text-center">
            ${product.price}
          </small>
        </div>
        <p className="text-lg px-2 rounded-lg text-center w-full">
          Brand: <span className="">{product.brand}</span>
        </p>
        <h4 className="font-semibold flex items-center text-sm text-center mb-6 w-full">
          {product.description}
        </h4>
        <div className="flex gap-6 w-full">
          <button
            onClick={addToCartHandler}
            className="text-white w-[100px] transition-all rounded-lg border-none hover:opacity-70 bg-green-700 h-[40px] flex justify-center items-center"
          >
            Add to cart
          </button>
          <button
            onClick={closeModal}
            className="text-blue-500 w-[100px] transition-all rounded-lg border-none hover:bg-gray-800 bg-black h-[40px] flex justify-center items-center"
          >
            Close
          </button>
        </div>
      </div>
      <Image
        isBlurred
        alt={product.title}
        className="object-fit h-[200px] border w-full p-0 m-0 rounded-none hover:opacity-50 flex justify-center transition-all"
        src={product.thumbnail}
      />
    </div>
  );
};

export default Modal;
