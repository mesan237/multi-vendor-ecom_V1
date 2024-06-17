import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Switcher from "@/Switcher";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs, Input, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { HiHome, HiUpload } from "react-icons/hi";

const AddCategory = ({ auth }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const submit = (event) => {
    event.preventDefault();

    // post(route('store.category'))
  };

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
          Category
        </a>
        <a href="#" className="font-extrabold dark:text-white">
          Add Category
        </a>
      </Breadcrumbs>

      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-components-dark">
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
          Add Category
        </h3>
        <form onSubmit={submit}>
          <div className="col-span-6 md:col-span-3 w-1/2">
            <label className="block text-sm text-gray-700 dark:text-white py-3 font-extrabold">
              Category Name
            </label>
            <Input
              name="category_name"
              color="blue"
              type="text"
              className="w-full"
              placeholder="Bedroom furniture"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
            <div className="col-span-6 md:col-span-3">
              <label className="block text-sm text-gray-700 dark:text-txt-dark py-3 font-extrabold">
                Category Image
              </label>

              <div className="w-full">
                <Input
                  labelProps={{
                    className: "hidden",
                  }}
                  name="category_image"
                  color="blue"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full py-2 px-32 border border-gray-300 rounded-lg shadow-sm overflow-auto relative
                    focus:outline-none focus:border-blue-500
                    file:mr-4 file:absolute file:top-0 file:left-0 file:p-2.5 file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                A furniture pic is useful to ...
              </p>
            </div>

            <div className="col-span-6 md:col-span-3 mr-auto">
              {selectedImage && (
                <aside className="mt-4 flex justify-center md:justify-end">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="max-w-full h-24 rounded-lg shadow-md"
                  />
                </aside>
              )}
            </div>

            <div className="col-span-6 md:col-span-3  md:justify-end">
              <Button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Save All
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default AddCategory;
