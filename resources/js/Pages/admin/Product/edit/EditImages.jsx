import { TrashIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

const EditImages = ({ open, closeModal, handleOpen, product_id }) => {
  const [previews, setPreviews] = useState([]);

  const { data, setData, post, processing, errors, progress } = useForm({
    id: product_id,
    images: [],
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews([...previews, ...newImages]);
    setData("images", [...data.images, ...files]);
    // console.log(data.images);
  };

  const handleDelete = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newImages = data.images.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    setData("images", newImages);
  };

  const submitProductImages = (e) => {
    e.preventDefault();
    post(route("add.product.images"));
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="dark:bg-components-dark"
    >
      <DialogHeader className="dark:text-white">Add image</DialogHeader>

      <form onSubmit={submitProductImages}>
        <DialogBody>
          <div className="col-span-3 sm:col-span-6 gap-3">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium dark:text-white"
              >
                Upload Furniture Images :
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
                {previews.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Uploaded ${index}`}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <IconButton
                      variant="outlined"
                      onClick={() => handleDelete(index)}
                      className="border-gray-300 dark:border-white bg-transparent dark:bg-[rgb(224,36,36)] absolute top-2 right-2 bg-red-500 text-white p-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      <TrashIcon
                        className="h-4 w-4 text-white dark:text-white"
                        color="red"
                      />
                    </IconButton>
                  </div>
                ))}
              </div>

              {progress && (
                <div className="w-full bg-gray-200 rounded-full mt-4">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${progress.percentage}%` }}
                  >
                    {progress.percentage}%
                  </div>
                </div>
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
            <span>save images</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default EditImages;
