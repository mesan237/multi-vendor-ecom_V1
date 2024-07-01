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

export default function EditSlider({ open, closeModal, category, handleOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setData("category_image", file);
    }
  };

  const { data, setData, post } = useForm({
    category_name: category?.category_name || "",
    category_image: "",
    id: category?.id || "",
    old_image: category?.image_category || "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("update.category"));
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="dark:bg-components-dark"
      >
        <DialogHeader className="dark:text-white">Edit Category</DialogHeader>
        <form onSubmit={submit}>
          <DialogBody>
            <div className="col-span-6 md:col-span-3 w-1/2 ">
              <label className="block text-sm text-gray-700 dark:text-white py-3 font-extrabold">
                Category Name
              </label>
              <Input
                name="category_name"
                color="blue"
                type="text"
                value={data?.category_name}
                onChange={(e) => setData("category_name", e.target.value)}
                className="w-full"
                placeholder="... furniture"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <input name="category_id" type="hidden" value={data?.id} />
              <input name="old_image" type="hidden" value={data?.image} />
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
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={closeModal}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>update Category</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
