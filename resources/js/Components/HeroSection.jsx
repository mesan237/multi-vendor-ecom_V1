import { Button, Typography } from "@material-tailwind/react";
import React from "react";

const HeroSection = ({ img }) => {
  return (
    <>
      <div className="relative h-full w-full">
        <img src={img} alt="image 2" className="h-full w-full object-cover" />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/25">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Discover the Best Furniture for Your Home
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Stylish, comfortable, and affordable furniture to make your home
              truly yours.
            </Typography>
            <Button size="lg" color="white">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
