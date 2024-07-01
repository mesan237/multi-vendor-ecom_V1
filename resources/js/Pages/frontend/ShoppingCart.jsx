import React from "react";
import Footer from "./Footer";
import NavbarMenu from "@/Components/NavbarMenu";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Option,
  Rating,
  Select,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  CheckIcon,
  ChevronRightIcon,
  HomeIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { products } from "@/datas/constants";

const TABLE_HEAD = ["Product", "price", "Quantity", "Subtotal", "Remove"];

const Wishlist = () => {
  return (
    <div>
      {" "}
      <NavbarMenu />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs
          separator={<ChevronRightIcon className="w-4 h-4" />}
          className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <a
            href="#"
            className="opacity-60 font-bold dark:text-white flex items-center gap-1"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </a>
          <a href="#" className="opacity-60 font-bold dark:text-white">
            Shop
          </a>
          <a href="#" className="font-extrabold dark:text-white">
            Cart
          </a>
        </Breadcrumbs>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <Card className="dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-none">
            <CardHeader className="mb-4 shadow-none">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center ">
                <div>
                  <Typography variant="h2" className="dark:text-white">
                    Your Cart
                  </Typography>
                  <Typography variant="h6" className="mt-1 dark:text-gray-400">
                    There are{" "}
                    <span className="text-green-400">{products.length}</span>{" "}
                    products in this list
                  </Typography>
                </div>
              </div>
            </CardHeader>

            <CardBody className="overflow-auto px-3">
              <table className="w-full min-w-max border rounded-lg text-left dark:border-gray-600 overflow-hidden">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="p-4 border-y border-gray-200 bg-gray-100 dark:bg-gray-800 uppercase"
                      >
                        <Typography
                          variant="h6"
                          className="leading-none dark:text-white font-extrabold"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(
                    ({ id, image, productName, price, quantity }, index) => (
                      <tr key={id} className="dark:text-white">
                        <td
                          className={`p-4 ${
                            index !== products.length - 1 &&
                            "border-b border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={image}
                              alt={productName}
                              size="xxl"
                              variant="rounded"
                              className="border border-gray-200 bg-gray-100 p-1"
                            />
                            <div className="flex flex-col gap-1">
                              <Typography
                                variant="subtitle2"
                                className="font-bold"
                              >
                                {productName}
                              </Typography>
                              <Rating value={4} readonly />
                            </div>
                          </div>
                        </td>

                        <td
                          className={`p-4 ${
                            index !== products.length - 1 &&
                            "border-b border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <Typography
                            variant="body2"
                            className="dark:text-gray-400"
                          >
                            ${price.toFixed(2)}
                          </Typography>
                        </td>

                        <td
                          className={`p-4 ${
                            index !== products.length - 1 &&
                            "border-b border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <Select
                            size="lg"
                            className=" border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                          >
                            <Option>1</Option>
                            <Option>2</Option>
                            <Option>3</Option>
                            <Option>4</Option>
                            <Option>5</Option>
                          </Select>
                        </td>

                        <td
                          className={`p-4 ${
                            index !== products.length - 1 &&
                            "border-b border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          {quantity * price}
                        </td>
                        <td
                          className={`p-4 ${
                            index !== products.length - 1 &&
                            "border-b border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <Tooltip content="Delete from wishlist">
                            <IconButton
                              variant="outlined"
                              onClick={() => {
                                handleOpenDelete();
                                setDeleteId(id);
                              }}
                              className="ml-2 dark:bg-red-700"
                            >
                              <TrashIcon className="text-gray-800 dark:text-white h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </CardBody>

            <CardFooter className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 p-4">
              <Button variant="outlined" size="small">
                Previous
              </Button>
              <div className="flex gap-2">
                <IconButton variant="outlined" size="small">
                  1
                </IconButton>
                <IconButton variant="text" size="small">
                  2
                </IconButton>
                <IconButton variant="text" size="small">
                  3
                </IconButton>
                <IconButton variant="text" size="small">
                  ...
                </IconButton>
                <IconButton variant="text" size="small">
                  8
                </IconButton>
                <IconButton variant="text" size="small">
                  9
                </IconButton>
                <IconButton variant="text" size="small">
                  10
                </IconButton>
              </div>
              <Button variant="outlined" size="small">
                Next
              </Button>
            </CardFooter>
          </Card>

          <Card
            color="blue-gray"
            variant="gradient"
            className="flex-1 w-full md:w-auto h-fit mt-[8rem] md:max-w-[20rem] p-8"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
            >
              <Typography variant="h4" color="white" className="font-extrabold">
                Summary
              </Typography>
            </CardHeader>
            <CardBody className="p-0">
              <ul className="flex flex-col gap-4">
                <li className="flex justify-between gap-4">
                  <Typography className="font-normal">Items </Typography>
                  <Typography className="font-normal">6 </Typography>
                </li>
                <div className="] border-gray-700 p-0 m-0"></div>
                <li className="flex justify-between gap-4">
                  <Typography className="font-normal">Quantity</Typography>
                  <Typography className="font-normal">25</Typography>
                </li>
                <div className=" border-gray-700 p-0 m-0"></div>
                <li className="flex justify-between gap-4">
                  <Typography className="font-normal">Subtotal</Typography>
                  <Typography className="font-normal">40</Typography>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="mt-12 p-0">
              <Button
                size="lg"
                color="white"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                ripple={false}
                fullWidth={true}
              >
                Proceed to checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
