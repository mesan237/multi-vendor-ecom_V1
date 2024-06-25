import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useForm, usePage } from "@inertiajs/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Breadcrumbs,
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

const AddProduct = function ({ auth }) {
  const { flash } = usePage().props;
  // updating informations
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    longDescription: "",
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

  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      return {
        file,
        url: URL.createObjectURL(file),
      };
    });
    setImages([...images, ...newImages]);
  };

  const handleDelete = (index) => {
    const newImages = images.filter((image, i) => i !== index);
    setImages(newImages);
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
                    Quantity
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
                    short description
                  </Typography>
                  <Input
                    size="lg"
                    name="short-description"
                    value={data.shortDescription}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) =>
                      setData("shortDescription", e.target.value)
                    }
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
                    <Select label="Select Version">
                      <Option>Material Tailwind HTML</Option>
                      <Option>Material Tailwind React</Option>
                      <Option>Material Tailwind Vue</Option>
                      <Option>Material Tailwind Angular</Option>
                      <Option>Material Tailwind Svelte</Option>
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
                <div className="col-span-3 sm:col-span-6 gap-3">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Long Description:
                    </Typography>
                    <ReactQuill
                      value={data.longDescription}
                      className="dark:bg-components-dark py-1"
                      onChange={(e) =>
                        setData("longDescription", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-6 gap-3">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Image insertion:
                    </Typography>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100"
                    />
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.url}
                            alt={`Uploaded ${index}`}
                            className="w-full h-auto object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleDelete(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
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
