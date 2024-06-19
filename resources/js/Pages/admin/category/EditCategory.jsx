import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function EditCategory({ open, handleOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setData("image", file);
    }
  };

  const { data, setData, post } = useForm({
    category_name: "",
    image: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("edit.category"));
  };
  return (
    <>
      <IconButton
        variant="outlined"
        className="mr-2 bg-transparent dark:bg-[rgb(37,99,235)] dark:border-white"
        onClick={handleOpen}
      >
        <PencilSquareIcon color="blue" className="h-4 w-4 dark:text-white" />
      </IconButton>

      <Dialog
        open={open}
        handler={handleOpen}
        className="dark:bg-components-dark dark:d"
      >
        <DialogHeader>Edit Category</DialogHeader>
        <DialogBody>
          <div className="col-span-6 md:col-span-3 w-1/2 ">
            <label className="block text-sm text-gray-700 dark:text-white py-3 font-extrabold">
              Category Name
            </label>
            <Input
              name="category_name"
              color="blue"
              type="text"
              value={data.category_name}
              onChange={(e) => setData("category_name", e.target.value)}
              className="w-full"
              placeholder="Bedroom furniture"
              labelProps={{
                className: "before:content-none after:content-none",
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
                  // labelProps={{
                  //   className: "hidden",
                  // }}
                  name="category_image"
                  color="blue"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full py-2 px-32 border border-gray-300 rounded-lg shadow-sm overflow-auto relative
                      focus:outline-none focus:border-blue-500
                      file:mr-4 file:absolute file:top-0 file:left-0 file:p-2.5 file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100 input-default dark:file:bg-[rgb(88,105,130)] dark:file:text-gray-100"
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

            <div className="col-span-6 md:col-span-3 md:justify-end">
              <Button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Save All
              </Button>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleOpen}
            type="submit"
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
