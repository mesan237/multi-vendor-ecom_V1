import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useForm, usePage } from "@inertiajs/react";
import {
  Breadcrumbs,
  Button,
  Input,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

const AddProduct = function ({ auth }) {
  const { flash } = usePage().props;
  // updating informations
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    shortDescription: "",
    category: "",
    subCategory: "",
    color: "",
    material: "",
    price: "",
    stock: "",
    assemblyRequired: false,
    type: "",
    style: "",
    design: "",
    features: "",
    brand: "",
    warranty: "",
    dimensions: { height: "", width: "", length: "", depth: "" },
  });

  const submitDetails = (e) => {
    e.preventDefault();
    try {
      post(route("save.product"));
    } catch (error) {
      console.error("There was an error", error);
    }
  };
  return (
    <AuthenticatedLayout user={auth.user}>
      <Breadcrumbs
        separator={<ChevronRightIcon className="w-4 h-4" strokeWidth={2} />}
        className="mb-1 bg-white dark:bg-page-dark pl-0"
      >
        <a href="#" className="opacity-60 font-bold dark:text-white">
          Dashboard
        </a>
        <a href="#" className="font-extrabold dark:text-white">
          Add product
        </a>
      </Breadcrumbs>
      <Typography
        variant="h1"
        className="mb-4 text-xl font-bold text-gray-900 dark:text-white"
      >
        Add a Product
      </Typography>

      <div>
        <div className="col-span-2 xl:col-span-4">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-800 sm:p-6 dark:bg-components-dark">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Add a product
            </h3>
            <form onSubmit={submitDetails}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Name
                  </Typography>
                  <Input
                    size="lg"
                    name="name"
                    value={data.name}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography className="-mb-1 dark:text-white">
                    Price
                  </Typography>
                  <Input
                    size="lg"
                    name="price"
                    value={data.price}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("price", e.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Stock
                  </Typography>
                  <Input
                    size="lg"
                    name="stock"
                    value={data.stock}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("stock", e.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Description
                  </Typography>
                  <Input
                    size="lg"
                    name="description"
                    placeholder="description"
                    value={data.description}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("description", e.target.value)}
                  />
                </div>
                <div className="col-span-3 sm:col-span-6 flex gap-3">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Category
                    </Typography>
                    <Select
                      size="lg"
                      labelProps={{
                        className: "hidden",
                      }}
                      className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                      <Option>Male</Option>
                      <Option>Female</Option>
                    </Select>
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      subcategory
                    </Typography>
                    <Select
                      size="lg"
                      labelProps={{
                        className: "hidden",
                      }}
                      className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                      <Option>Male</Option>
                      <Option>Female</Option>
                    </Select>
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Color
                    </Typography>
                    <Select
                      size="lg"
                      labelProps={{
                        className: "hidden",
                      }}
                      className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                      <Option>1</Option>
                      <Option>2</Option>
                      <Option>3</Option>
                      <Option>4</Option>
                    </Select>
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      wood tone
                    </Typography>
                    <Select
                      size="lg"
                      labelProps={{
                        className: "hidden",
                      }}
                      className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                      <Option>2022</Option>
                      <Option>2021</Option>
                      <Option>2020</Option>
                    </Select>
                  </div>
                </div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-bold"
                >
                  Dimensions
                </Typography>
                <div className="col-span-3 sm:col-span-6 flex gap-3">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Height
                    </Typography>
                    <Input
                      size="lg"
                      name="height"
                      type="number"
                      value={data.dimensions.height}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      // onChange={(e) => setData(`${dimensions.height}`, e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Width
                    </Typography>
                    <Input
                      size="lg"
                      name="width"
                      type="number"
                      value={data.dimensions.width}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      // onChange={(e) => setData(`${dimensions.height}`, e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      length
                    </Typography>
                    <Input
                      size="lg"
                      name="length"
                      type="number"
                      value={data.dimensions.length}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      // onChange={(e) => setData(`${dimensions.height}`, e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Depth
                    </Typography>
                    <Input
                      size="lg"
                      name="length"
                      type="number"
                      value={data.dimensions.depth}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      // onChange={(e) => setData(`${dimensions.height}`, e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    warranty
                  </Typography>
                  <Input
                    size="lg"
                    name="warranty"
                    placeholder="phone"
                    value={data.warranty}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("warranty", e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-full">
                  <Button
                    variant="gradient"
                    type="submit"
                    color="blue"
                    className="dark:bg-blue-500"
                  >
                    Save product
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AddProduct;
