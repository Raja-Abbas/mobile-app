// Main.jsx
import React, { useState } from "react";
import { connect } from "react-redux";
import { Badge } from "@nextui-org/badge";
import { CartIcon } from "./CartIcon";
import Image from "next/image";
import { removeFromCart } from "./cartActions";

const Main = ({ cartItems, removeFromCart }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  // Fixed Delivery Charges
  const deliveryCharges = 15;

  // Calculate Total
  const total = subtotal + deliveryCharges;

  const handleRemoveFromCart = (productId) => {
    // Dispatch the action to remove the item from the cart
    removeFromCart(productId);
  };

  return (
    <div className="flex items-center gap-4 transition-all ease-in-out cursor-pointer text-white relative">
      <div className="flex items-center px-2 py-2" onClick={toggleSidebar}>
        <Badge
          color="warning"
          content={cartItems.length}
          shape="circle"
          radius="lg"
          className="text-white"
        >
          <CartIcon size={100} />
        </Badge>
      </div>

      {isSidebarVisible && (
        <div className="fixed pt-20 bg-opacity-95 px-5 top-[100px] bottom-0 right-0 z-40 transition-all animate-appearance-in ease-in-out max-lg:w-[100%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] h-[100vh] bg-gray-300 shadow-2xl transform">
          <div>
            <p className="text-2xl text-orange-500 uppercase">Added Items:</p>
            <ul className="flex flex-col gap-5 mt-10 overflow-x-scroll scroll-ms-2 scroll-smooth max-lg:h-[50vh] lg:h-[40vh] xl:h-[50vh]">
              {cartItems.map((cartProduct, index) => (
                <li key={index}>
                  <div className="flex px-3 justify-around items-center z-50 py-3 border border-orange-500 rounded-ss-lg rounded-se-lg bg-orange-500">
                    <Image
                      src={cartProduct.thumbnail}
                      alt={cartProduct.title}
                      width={150}
                      height={150}
                      className="object-cover mr-2"
                    />
                    <div className="flex flex-col w-full text-center justify-center">
                      <p className="text-sm uppercase">{cartProduct.category} : {cartProduct.title}</p>
                      <p className="text-[18px]">Price: ${cartProduct.price}</p>
                    </div>
                  </div>
                  <div
                    className="bg-black text-white text-center text-[18px] rounded-es-lg rounded-ee-lg py-1 transition-all uppercase hover:bg-gray-800 hover:text-gray-200"
                    onClick={() => handleRemoveFromCart(cartProduct.id)}
                  >
                    Remove From Cart
                  </div>
                </li>
              ))}
            </ul>
            <hr className="border border-gray-500"/>
            <div className="bg-white px-4 py-2 flex flex-col gap-4">
              <p className="text-[16px] text-black">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="text-[16px] text-black">Delivery Charges: ${deliveryCharges.toFixed(2)}</p>
              <hr className="border border-gray-500"/>
              <p className="text-[18px] font-bold text-black">Total: ${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

