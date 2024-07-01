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
  Chip,
  IconButton,
  Input,
  Rating,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  HomeIcon,
  HomeModernIcon,
  PhoneArrowUpRightIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { products } from "@/datas/constants";

const TABLE_HEAD = ["Product", "price", "stock status", "Action", "Remove"];

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
            Wishlist
          </a>
        </Breadcrumbs>

        <Card className="dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-none">
          <CardHeader className="mb-4 shadow-none">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center ">
              <div>
                <Typography variant="h2" className="dark:text-white">
                  Your Wishlist
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
                  ({ id, image, productName, price, inStock }, index) => (
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
                        {inStock ? (
                          <Chip
                            value="In stock"
                            className="bg-green-100 text-green-800 w-fit lowercase"
                          />
                        ) : (
                          <Chip
                            value="Out of stock"
                            className="bg-red-100 text-red-800 w-fit lowercase"
                          />
                        )}
                      </td>

                      <td
                        className={`p-4 ${
                          index !== products.length - 1 &&
                          "border-b border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {inStock ? (
                          <Button
                            variant="contained"
                            color="green"
                            className="flex items-center gap-2"
                          >
                            <ShoppingCartIcon className="h-4 w-4" />
                            Add to Cart
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="blue-gray"
                            className="flex items-center gap-2"
                          >
                            <PhoneArrowUpRightIcon className="h-4 w-4" />
                            Contact us
                          </Button>
                        )}
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
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
