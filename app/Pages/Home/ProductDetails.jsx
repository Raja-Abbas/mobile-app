// productdetails.jsx
import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div>
      <h1>{product.title}</h1>
      {/* Display other product details here */}
    </div>
  );
};

export default ProductDetails;
