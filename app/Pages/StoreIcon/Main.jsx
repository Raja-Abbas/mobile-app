// Main.jsx
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Badge } from "@nextui-org/badge";
import { CartIcon } from "./CartIcon";
import Image from "next/image";
import { addToCart } from "./cartActions";

const Main = ({ addToCart, cartItems }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
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
        <div className="fixed pt-16 px-5 top-[100px] bottom-0 right-0 z-50 transition-all animate-appearance-in ease-in-out max-lg:w-[100%] lg:w-[25%] h-[100vh] bg-gray-300 shadow-2xl transform">
          <div>
            <p className="text-xl text-orange-500">Added Items</p>
            <ul>
              {cartItems.map((cartProduct, index) => (
                <li key={index}>
                  <div className="flex items-center z-50">
                    <Image
                      src={cartProduct.thumbnail}
                      alt={cartProduct.title}
                      width={100}
                      height={100}
                      className="h-8 w-8 object-cover mr-2"
                    />
                    <div>
                      <p>{cartProduct.title}</p>
                      <p>${cartProduct.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
