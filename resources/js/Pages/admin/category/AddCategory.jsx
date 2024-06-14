import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Breadcrumb, FileInput, Label } from "flowbite-react";
import { useForm } from "@inertiajs/react";

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

  const { post } = useForm({
    category_name: "",
    image: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("store.category"));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className=" pr-5 py-3 "
        // className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
      >
        <Breadcrumb.Item href="#" icon={HiHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Manage category</Breadcrumb.Item>
        <Breadcrumb.Item>Add Category</Breadcrumb.Item>
      </Breadcrumb>

      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
          Add Category
        </h3>
        <form onSubmit={submit}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="category_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category Name
              </label>
              <input
                type="text"
                name="category_name"
                id="category_name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Bedroom Furniture"
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              {selectedImage && (
                <aside className="mt-4">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="max-w-full h-24 rounded-lg shadow-md"
                  />
                </aside>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <div className="mb-2 block">
                <label
                  htmlFor="file"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  category image
                </label>
              </div>

              <input
                type="file"
                id="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                A furniture pic is useful to ...
              </p>
            </div>

            <div className="col-span-6 sm:col-full">
              <button color="primary" type="submit">
                Save all
              </button>
            </div>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default AddCategory;
