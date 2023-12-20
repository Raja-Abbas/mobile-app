// card.jsx
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Modal from "./Modal";

export default function App({ addToCartCallback }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the array is inside a property named 'products'
        const productsArray = data.products || [];
        setProducts(productsArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const isProductInCart = cartItems.some((item) => item.id === product.id);
    if (isProductInCart) {
      // If the product is in the cart, remove it
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCart);
    } else {
      // If the product is not in the cart, add it
      setCartItems([...cartItems, product]);
      // Open the modal when adding to cart
      setSelectedProduct(product);
      setModalOpen(true);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Filter items with the selected category and limit to 14 items
  const filter = (product) =>
    (selectedCategory.toLowerCase() === "all" 
    ||
      product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    (product.category.toLowerCase() === "smartphones" ||
      product.category.toLowerCase() === "laptops" ||
      product.category.toLowerCase() === "fragrances" ||
      product.category.toLowerCase() === "skincare"  ||
      product.category.toLowerCase() === "groceries" ||
       product.category.toLowerCase() === "home-decoration");

  const filteredProducts = products.filter(filter);

  // Function to close the modal
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
                selectedCategory === "home-decoration" && "bg-gray-500 text-white"
              }`}
              onClick={() => handleCategoryClick("home-decoration")}
            >
              Home Decoration
            </p>
          </div>
        </div>
      </div>
     <div className="flex flex-wrap mt-6 justify-center items-start gap-10 w-[100%]">
      {filteredProducts.map((product) => (
        <Card
          key={product.id}
          className="max-lg:max-w-[270px] lg:max-w-[270px] max-h-[620px] hover:w-[100%] sm:flex-col hover:justify-center inline-flex hover:bg-gray-200 text-center hover:scale-[1.02] transition-all cursor-pointer ease-in-out items-start rounded-xl shadow-2xl bg-transparent"
          onClick={() => addToCart(product)}
        >
          <CardBody className="z-0 p-0 relative overflow-hidden flex justify-start items-start">
            <div className="flex justify-between w-full px-3 absolute top-5 z-50 transition-opacity ease-in-out">
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
            <CardHeader className="pb-0 pt-8 px-4 h-[300px] text-lg bg-opacity-75 justify-center bg-white flex-col rounded-none gap-2 items-start">
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
              <h4 className="font-semibold h-[80px] flex items-center text-sm text-center mb-24 w-full">
                {product.description}
              </h4>
              <button
                onClick={() => addToCart(product)}
                className="absolute w-[92%] h-[50px] mt-8 bottom-[10px] shadow-inner text-white hover:bg-sky-800 transition-all font-bold bg-sky-600 px-4 py-2 items-center w-100 flex justify-center uppercase"
              >
                {cartItems.some((item) => item.id === product.id)
                  ? "Details"
                  : "Details"}
              </button>
            </CardHeader>
          </Card>
        ))}
      </div>
     <Modal isOpen={modalOpen} closeModal={closeModal} product={selectedProduct} addToCartCallback={addToCart}/>
    </div>
  );
}
