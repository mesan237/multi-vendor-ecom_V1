import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import NavbarMenu from "@/Components/NavbarMenu";
import roomdecor from "../../images/room_decor.jpg";
import chairsofa from "../../images/chair_sofa.jpg";
import decorhome from "../../images/decor_home.jpg";
import longsofa from "../../images/long_sofa.jpg";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { categories, furnitureData, blogData } from "@/datas/constants";
import HeroSection from "@/Components/HeroSection";
import Footer from "./frontend/Footer";
import { Rating } from "react-simple-star-rating";

const CategoryCard = ({ category }) => (
  <div className="relative rounded-lg overflow-hidden group shadow-lg transition-transform transform hover:scale-105">
    <img
      src={chairsofa}
      alt={category.name}
      className="w-full h-full object-cover"
    />
    <a
      href="#"
      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-white font-semibold group-hover:bg-opacity-60 transition-opacity"
    >
      {category.name}
    </a>
  </div>
);

const FurnitureCard = ({ item }) => {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value = 2, index = 2) => console.log(value, index);

  const tooltipArray = [
    "Terrible",
    "Terrible+",
    "Bad",
    "Bad+",
    "Average",
    "Average+",
    "Great",
    "Great+",
    "Awesome",
    "Awesome+",
  ];

  const fillColorArray = [
    "#f17a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045",
  ];

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden group">
      <img
        className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
        src={longsofa}
        alt={item.name}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`h-5 w-5 ${
                i < item.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
          {/* <Rating
            readonly
            size={50}
            initialValue={3}
            transition
            allowFraction
            showTooltip
            tooltipArray={tooltipArray}
            fillColorArray={fillColorArray}
          /> */}

          <span className="ml-2 text-gray-600">({item.rating})</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-semibold">${item.price}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-white text-primary p-2 rounded-full hover:bg-primary hover:text-white transition">
          <FaHeart />
        </button>
        <button className="bg-white text-primary p-2 rounded-full hover:bg-primary hover:text-white transition">
          <FaShoppingCart />
        </button>
        <button className="bg-white text-primary p-2 rounded-full hover:bg-primary hover:text-white transition">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

const BlogCard = ({ post }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden group">
      <img
        className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
        src={roomdecor}
        alt={post.title}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
        <p className="text-sm text-gray-600 mt-2">{post.description}</p>
        <div className="flex items-center mt-4">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={roomdecor}
            alt={post.author}
          />
          <div className="ml-3">
            <h4 className="text-sm font-semibold text-gray-800">
              {post.author}
            </h4>
            <p className="text-xs text-gray-600">{post.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footers = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We are a leading furniture e-commerce website providing a wide
              range of quality furniture for all your needs. Our mission is to
              deliver exceptional products and services to our valued customers.
            </p>
          </div>
          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href={route("become.vendor")} className="hover:underline">
                  Become a vendor
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter to receive the latest updates and
              offers.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
          &copy; 2024 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const banners = [
  {
    id: 1,
    img: chairsofa,
  },
  {
    id: 2,
    img: decorhome,
  },
  {
    id: 3,
    img: roomdecor,
  },
  { id: 4, img: longsofa },
];

const Welcome = ({ auth }) => {
  return (
    <>
      {/* <Head title="Welcome" /> */}
      <NavbarMenu auth={auth} />

      <div className="h-64 sm:h-80 xl:h-96 2xl:h-[28rem]">
        <Carousel className="rounded-xl overflow-x-hidden">
          {banners.map(({ id, img }) => (
            <HeroSection key={id} img={img} />
          ))}
        </Carousel>
      </div>

      {/* shop by category */}
      <div className="py-8 px-12">
        <div className="container mx-auto py-16 px-4">
          <h2 className="text-3xl text-gray-800 capitalize mb-8 text-center font-extrabold">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>

        {/* Special offers */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Special Offers</h2>
            <p className="mb-8">Don't miss out on our limited-time deals!</p>
            <a
              href="#"
              className="bg-primary text-white px-8 py-3 rounded-full"
            >
              View Offers
            </a>
          </div>
        </section>

        <div className="container mx-auto py-16">
          <h2 className="text-3xl font-extrabold text-gray-800 capitalize mb-6">
            Trending products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {furnitureData.map((item) => (
              <FurnitureCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="container mx-auto py-16">
          <h2 className="text-3xl font-extrabold text-gray-800 Capitalize mb-6">
            Latest Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
