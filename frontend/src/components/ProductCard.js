

import React from 'react';

const ProductCard = ({ product }) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = product;

  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} className="product-thumbnail" />
      <div className="product-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <p>
          <strong>Discount:</strong> {discountPercentage}%
        </p>
        <p>
          <strong>Rating:</strong> {rating}
        </p>
        <p>
          <strong>Stock:</strong> {stock}
        </p>
        <p>
          <strong>Brand:</strong> {brand}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
      </div>
      <div className="product-gallery">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
