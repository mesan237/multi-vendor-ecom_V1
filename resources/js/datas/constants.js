export const categories = [
  { name: "Bedroom", imgSrc: "../../images/room_decor.jpg" },
  { name: "Mattress", imgSrc: "../../images/chair_sofa.jpg" },
  { name: "Outdoor", imgSrc: "../../images/chair_sofa.jpg" },
  { name: "Sofa", imgSrc: "../../images/decor_home.jpg" },
  { name: "Living Room", imgSrc: "../../images/long_sofa.jpg" },
];

import roomdecor from "../../images/room_decor.jpg";
import chairsofa from "../../images/chair_sofa.jpg";
import decorhome from "../../images/decor_home.jpg";
import longsofa from "../../images/long_sofa.jpg";

const furnitureData = [
  {
    id: 1,
    name: "Modern Sofa",
    description:
      "A stylish and comfortable modern sofa perfect for any living room.",
    rating: 4.5,
    price: 799.99,
    category: "Living Room",
    imageUrl: "https://example.com/images/sofa.jpg",
  },
  {
    id: 2,
    name: "Wooden Dining Table",
    description:
      "A classic wooden dining table that can seat up to six people.",
    rating: 4.7,
    price: 599.99,
    category: "Dining Room",
    imageUrl: "https://example.com/images/dining_table.jpg",
  },
  {
    id: 3,
    name: "Queen Size Bed",
    description: "A comfortable queen size bed with a modern design.",
    rating: 4.3,
    price: 899.99,
    category: "Bedroom",
    imageUrl: "https://example.com/images/queen_bed.jpg",
  },
  {
    id: 4,
    name: "Office Chair",
    description:
      "An ergonomic office chair with adjustable height and lumbar support.",
    rating: 4.8,
    price: 199.99,
    category: "Office",
    imageUrl: "https://example.com/images/office_chair.jpg",
  },
  {
    id: 5,
    name: "Outdoor Lounge Set",
    description:
      "A durable and stylish outdoor lounge set perfect for your patio.",
    rating: 4.6,
    price: 1299.99,
    category: "Outdoor",
    imageUrl: "https://example.com/images/outdoor_lounge.jpg",
  },
  {
    id: 6,
    name: "Kids Bunk Bed",
    description:
      "A fun and safe bunk bed for kids, with plenty of storage space.",
    rating: 4.4,
    price: 499.99,
    category: "Kids",
    imageUrl: "https://example.com/images/bunk_bed.jpg",
  },
  {
    id: 7,
    name: "Leather Recliner",
    description:
      "A luxurious leather recliner with multiple reclining positions.",
    rating: 4.9,
    price: 999.99,
    category: "Living Room",
    imageUrl: "https://example.com/images/recliner.jpg",
  },
  {
    id: 8,
    name: "Kitchen Island",
    description:
      "A functional kitchen island with storage and a breakfast bar.",
    rating: 4.2,
    price: 699.99,
    category: "Kitchen",
    imageUrl: "https://example.com/images/kitchen_island.jpg",
  },
];

const blogData = [
  {
    id: 1,
    title: "Modern Home Decor Ideas",
    description: "Explore the latest trends in home decor and get inspired.",
    imageUrl: "https://via.placeholder.com/300x200",
    author: "John Doe",
    authorImage: "https://via.placeholder.com/50",
    date: "June 10, 2023",
  },
  {
    id: 2,
    title: "Top 10 Furniture Trends of 2024",
    description: "Discover the top furniture trends of the year.",
    imageUrl: "https://via.placeholder.com/300x200",
    author: "Jane Smith",
    authorImage: "https://via.placeholder.com/50",
    date: "June 12, 2023",
  },
  {
    id: 3,
    title: "Top 10 Furniture Trends of 2024",
    description: "Discover the top furniture trends of the year.",
    imageUrl: "https://via.placeholder.com/300x200",
    author: "Jane Smith",
    authorImage: "https://via.placeholder.com/50",
    date: "June 12, 2023",
  },
  {
    id: 4,
    title: "Top 10 Furniture Trends of 2024",
    description: "Discover the top furniture trends of the year.",
    imageUrl: "https://via.placeholder.com/300x200",
    author: "Jane Smith",
    authorImage: "https://via.placeholder.com/50",
    date: "June 12, 2023",
  },

  {
    id: 5,
    title: "Top 10 Furniture Trends of 2024",
    description: "Discover the top furniture trends of the year.",
    imageUrl: "https://via.placeholder.com/300x200",
    author: "Jane Smith",
    authorImage: "https://via.placeholder.com/50",
    date: "June 12, 2023",
  },

  {
    id: 6,
    title: "Top 10 Furniture Trends of 2024",
    description: "Discover the top furniture trends of the year.",
    imageUrl: "https://via.placeholder.com/300x200",
    author: "Jane Smith",
    authorImage: "https://via.placeholder.com/50",
    date: "June 12, 2023",
  },
];

const products = [
  {
    image: roomdecor,
    productName: "Product 1",
    price: 19.99,
    quantity: 10,
    inStock: true,
  },
  {
    image: roomdecor,
    productName: "Product 3",
    price: 9.99,
    quantity: 0,
    inStock: false,
  },
  {
    image: longsofa,
    productName: "Product 6",
    price: 25.99,
    quantity: 0,
    inStock: false,
  },
  {
    image: longsofa,
    productName: "Product 8",
    price: 5.99,
    quantity: 25,
    inStock: true,
  },
  {
    image: decorhome,
    productName: "Product 9",
    price: 19.99,
    quantity: 0,
    inStock: false,
  },
  {
    image: chairsofa,
    productName: "Product 10",
    price: 59.99,
    quantity: 8,
    inStock: true,
  },
];

export {
  roomdecor,
  chairsofa,
  decorhome,
  longsofa,
  furnitureData,
  blogData,
  products,
};
