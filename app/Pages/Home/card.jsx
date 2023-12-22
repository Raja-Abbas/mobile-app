
// card.jsx
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function App({ addToCartCallback }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        const productsArray = data.products || [];
        setProducts(productsArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addToCart = (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);
    if (isProductInCart) {
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, product]);
      setSelectedProduct(product);
      setModalOpen(true);
    }
  };

 const handleReadMoreClick = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    router.push('/CardComponent');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filter = (product) =>
    (selectedCategory.toLowerCase() === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    (product.category.toLowerCase() === "smartphones" ||
      product.category.toLowerCase() === "laptops" ||
      product.category.toLowerCase() === "fragrances" ||
      product.category.toLowerCase() === "skincare" ||
      product.category.toLowerCase() === "groceries" ||
      product.category.toLowerCase() === "home-decoration");

  const filteredProducts = products.filter(filter);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex max-xl:flex-col xl:flex-row gap-6 z-10 w-[100%] bg-gray-200 min-[2200px]:h-[100vh]">
      <div className="flex shadow-2xl border-r bg-opacity-95 border-gray-300 bg-transparent max-lg:hidden flex-col flex-wrap pt-6 justify-start px-5 items-start gap-4 lg:w-[100%] xl:w-[300px]">
        <div className="xl:fixed overflow-x-scroll">
          <p className="text-2xl text-orange-500 uppercase">Category:</p>
          <div className="flex gap-4 lg:flex-wrap xl:flex-col mt-10">
            <p
              className={`px-3 py-1 bg-gray-300 hover:bg-gray-500 uppercase text-lg rounded-lg cursor-pointer transition-all duration-300 ${
                selectedCategory === "all" && "bg-gray-500 text-white"
              }`}
              onClick={() => handleCategoryClick("all")}
            >
              All
            </p>
            <p
              className={`px-3 py-1 bg-gray-300 hover:bg-gray-500 uppercase text-lg rounded-lg cursor-pointer transition-all duration-300 ${
                selectedCategory === "laptops" && "bg-gray-500 text-white"
              }`}
              onClick={() => handleCategoryClick("laptops")}
            >
              Laptops
            </p>
            <p
              className={`px-3 py-1 bg-gray-300 hover:bg-gray-500 uppercase text-lg rounded-lg cursor-pointer transition-all duration-300 ${
                selectedCategory === "smartphones" && "bg-gray-500  text-white"
              }`}
              onClick={() => handleCategoryClick("smartphones")}
            >
              Smartphones
            </p>
            <p
              className={`px-3 py-1 bg-gray-300 hover:bg-gray-500 uppercase text-lg rounded-lg cursor-pointer transition-all duration-300 ${
                selectedCategory === "fragrances" && "bg-gray-500 text-white"
              }`}
              onClick={() => handleCategoryClick("fragrances")}
            >
              Fragrances
            </p>
            <p
              className={`px-3 py-1 bg-gray-300 hover:bg-gray-500 uppercase text-lg rounded-lg cursor-pointer transition-all duration-300 ${
                selectedCategory === "skincare" && "bg-gray-500 text-white"
              }`}
              onClick={() => handleCategoryClick("skincare")}
            >
              Skincare
            </p>
            <p
              className={`px-3 py-1 bg-gray-300 hover:bg-gray-500 uppercase text-lg rounded-lg cursor-pointer transition-all duration-300 ${
                selectedCategory === "groceries" && "bg-gray-500 text-white"
              }`}
              onClick={() => handleCategoryClick("groceries")}
            >
              Groceries
            </p>
            <p
              className={`px-3 py-1 bg-gray-300 hover:bg-gray-500 uppercase text-lg rounded-lg cursor-pointer transition-all duration-300 ${
                selectedCategory === "home-decoration" &&
                "bg-gray-500 text-white"
              }`}
              onClick={() => handleCategoryClick("home-decoration")}
            >
              Home Decoration
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-6 mb-6 justify-center items-start gap-10 w-[100%]">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="max-lg:max-w-[270px] lg:max-w-[270px] max-h-[550px] hover:w-[100%] sm:flex-col hover:justify-center inline-flex hover:bg-gray-200 text-center hover:scale-[1.02] transition-all cursor-pointer ease-in-out items-start rounded-xl shadow-2xl bg-transparent"
            onClick={() => addToCart(product)}
          >
            <CardBody className="z-0 p-0 relative overflow-hidden flex justify-start items-start">
              <div className="flex justify-between w-full px-3 absolute top-2 z-50 transition-opacity ease-in-out">
                <p className="bg-gray-400 px-2 py-1 text-[12px] shadow-inner rounded-md text-white">
                  Discount: {product.discountPercentage}%
                </p>
                <p className="bg-[#e35225] px-2 py-1 text-[12px] shadow-inner rounded-md text-white">
                  Rating: {product.rating}
                </p>
              </div>
              <Image
                isBlurred
                alt={product.title}
                className="object-fit h-[200px] border w-[270px] p-0 m-0 rounded-none hover:opacity-50 flex justify-center transition-all"
                src={product.thumbnail}
              />
            </CardBody>
            <CardHeader className="pb-0 px-4 h-[340px] text-lg bg-opacity-75 justify-center bg-white flex-col rounded-none gap-2 items-start">
              <p className="w-full text-xl uppercase font-bold px-2 py-2 rounded-lg text-center">
                {product.category}
              </p>
              <div className="flex w-full -mt-2 items-center justify-between">
                <small className="text-md px-2 uppercase rounded-lg text-center ">
                  {product.title}
                </small>
                <small className="text-md inline-flex bg-sky-600 px-2 text-white rounded-lg text-center">
                  ${product.price}
                </small>
              </div>
              <p className="text-lg px-2 rounded-lg text-center w-full">
                Brand: <span className="">{product.brand}</span>
              </p>
              <h4 className="font-semibold h-[80px] flex items-center text-sm text-center w-full">
                {product.description}
              </h4>
              <div className="flex gap-2 w-[100%]">
              <button
                onClick={() => {
                  addToCart(product);
                }}
                className="h-[50px] text-[14px] mt-2 w-[50%] shadow-inner text-white hover:bg-sky-800 transition-all font-bold bg-sky-600 px-4 py-2 items-center place-content-end content-end w-100 flex justify-center uppercase"
              >
                {cartItems.some((item) => item.id === product.id)
                  ? "Add Item"
                  : "Add Item"}
              </button>
              <Link href='/CardComponent' className="w-[50%]" onClick={() => handleReadMoreClick(product)}>
            <button className='h-[50px] text-[14px] mt-2 w-full shadow-inner text-white hover:bg-sky-800 transition-all font-bold bg-sky-600 px-4 py-2 items-center place-content-end content-end w-100 flex justify-center uppercase'>Read More</button>
          </Link>
          </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        closeModal={closeModal}
        product={selectedProduct}
        addToCartCallback={addToCart}
      />
    </div>
  );
}