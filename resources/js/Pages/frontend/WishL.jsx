import React, { useState } from "react";
// import { ClearAll } from "@material-ui/icons";
import { HomeIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";

const initialWishlist = [
  // Example products, replace with actual data or API call
  {
    id: 1,
    image: "https://example.com/image1.jpg",
    name: "Product 1",
    price: 19.99,
    description: "Description 1",
  },
  {
    id: 2,
    image: "https://example.com/image2.jpg",
    name: "Product 2",
    price: 29.99,
    description: "Description 2",
  },
  {
    id: 3,
    image: "https://example.com/image2.jpg",
    name: "Product 2",
    price: 29.99,
    description: "Description 2",
  },
  // More products...
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const moveToCart = (id) => {
    // Logic to move item to cart
    setWishlist(wishlist.filter((product) => product.id !== id));
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((product) => product.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
      <div className="mb-4">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<HomeIcon />}
          onClick={clearWishlist}
        >
          Clear Wishlist
        </Button>
      </div>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        wishlist.map((product) => (
          <WishlistProduct
            key={product.id}
            product={product}
            moveToCart={moveToCart}
            removeFromWishlist={removeFromWishlist}
          />
        ))
      )}
    </div>
  );
};

const WishlistProduct = ({ product, moveToCart, removeFromWishlist }) => {
  return (
    <div className="flex p-4 border-b border-gray-200 transition-transform transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-grow ml-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        {product.price && (
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        )}
        {product.description && (
          <p className="text-gray-500">{product.description}</p>
        )}
        <div className="mt-2 flex space-x-2">
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeModernIcon />}
            onClick={() => moveToCart(product.id)}
          >
            Move to Cart
          </Button>
          <IconButton
            color="secondary"
            onClick={() => removeFromWishlist(product.id)}
          >
            <HomeModernIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
