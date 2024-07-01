import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import {
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Breadcrumbs,
} from "@material-tailwind/react";
import { Link, router } from "@inertiajs/react";
import DeleteComponent from "@/Components/DeleteComponents";
import EditProduct from "./EditProduct";

const TABLE_HEAD = [
  "Image",
  "quantity",
  "subcategory",
  "price",
  "furniture code",
  "Actions",
];

export function AllProducts({ auth, products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for the delete modal
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const handleOpenDelete = () => setOpen(true);
  const handleCloseDelete = () => setOpen(false);
  const deleteProduct = () => {
    // router.delete(`/delete/product/`);
  };

  const handleOpen = () => setIsModalOpen(true);

  const handleEdit = (id) => {
    router.get(route("fetch.edit.product", id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  console.log(products && products);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Breadcrumbs
        separator={<ChevronRightIcon className="w-4 h-4" strokeWidth={2} />}
        className="mb-4 bg-white dark:bg-page-dark pl-0"
      >
        <a href="#" className="opacity-60 font-bold dark:text-white">
          Dashboard
        </a>
        <a href="#" className="opacity-60 font-bold dark:text-white">
          Product
        </a>

        <a href="#" className="font-extrabold dark:text-white">
          All Products
        </a>
      </Breadcrumbs>
      {isModalOpen && (
        <EditProduct
          open={isModalOpen}
          product={selectedProduct}
          closeModal={closeModal}
          handleOpen={handleOpen}
        />
      )}
      {open && (
        <DeleteComponent
          open={open}
          handleOpen={handleOpenDelete}
          handleClose={handleCloseDelete}
          id={deleteId}
          path="/delete/product/"
          submit={deleteProduct}
          message="Are you sure you want to delete this product ?"
        />
      )}
      <Card className="h-full w-full dark:bg-components-dark dark:text-white px-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none dark:text-white dark:bg-components-dark"
        >
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography
                variant="h2"
                color="blue-gray"
                className="dark:text-white"
              >
                Products
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal dark:text-white"
              >
                List of all Products
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  className="dark:text-gray-200"
                />
              </div>
              <Button className="flex items-center gap-3" size="sm">
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{" "}
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-3 ">
          <table className="w-full min-w-max border rounded-lg text-left dark:border-gray-600 overflow-hidden">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 dark:bg-components-light uppercase border-blue-gray-50/25"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="leading-none opacity-70 dark:text-white font-extrabold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products ? (
                products?.map(
                  (
                    {
                      name,
                      images,
                      subcategory,
                      price,
                      id,
                      stock,
                      furniture_code,
                      furniture_slug,
                    },
                    index
                  ) => {
                    const isLast = index === products.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50/25";

                    return (
                      <tr
                        key={`${index}-${furniture_slug}`}
                        className="text-gray-900"
                      >
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              variant="rounded"
                              src={images[0]?.url}
                              alt={name}
                              size="xxl"
                              className="border-1 border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold dark:text-white"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:text-white"
                          >
                            {stock}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:text-white"
                          >
                            {subcategory.subcategory_name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:text-white"
                          >
                            {price}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:text-white"
                          >
                            {furniture_code}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton
                              variant="outlined"
                              className="mr-2 bg-transparent dark:bg-[rgb(37,99,235)] dark:border-white"
                              onClick={() => handleEdit(id)}
                            >
                              <PencilSquareIcon
                                color="blue"
                                className="h-4 w-4 dark:text-white"
                              />
                            </IconButton>
                          </Tooltip>

                          <Tooltip content="Delete User">
                            <IconButton
                              variant="outlined"
                              onClick={() => {
                                handleOpenDelete();
                                setDeleteId(id);
                              }}
                              className="border-gray-300 dark:border-white bg-transparent dark:bg-[rgb(224,36,36)]"
                            >
                              <TrashIcon
                                className="h-4 w-4 text-gray-800 dark:text-white"
                                color="red"
                              />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>No datas available</tr>
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" size="sm">
              8
            </IconButton>
            <IconButton variant="text" size="sm">
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
    </AuthenticatedLayout>
  );
}

export default AllProducts;
