import React, { useRef, useState } from "react";

import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link, router, useForm } from "@inertiajs/react";
import DeleteComponent from "@/Components/DeleteComponents";

const TABLE_HEAD = ["Image", "uplod", "overview", "Actions"];

export function EditProductImages({ images, handleDialogOpen, id }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for the delete modal
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const handleOpenDelete = () => setOpen(true);
  const handleCloseDelete = () => setOpen(false);
  const deleteCategory = (id) => {
    router.delete(`/delete/product/image`);
  };

  const { data, setData, post, processing, errors } = useForm({
    // old_image: "",
    image: "",
  });

  const [formData, setFormData] = useState({});

  const handleOpen = () => setIsModalOpen(true);

  const handleEditClick = (id) => {};

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };
  const [selectedImages, setSelectedImages] = useState({});
  const fileInputRefs = useRef({});

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImages((prevState) => ({
        ...prevState,
        [index]: URL.createObjectURL(file),
      }));
    }
  };

  const handleButtonClick = (index) => {
    fileInputRefs.current[index].click();
  };

  const submitProductImage = (e, imageUrl, index) => {
    e.preventDefault();
    const formElement = e.target;
    const formDataObj = new FormData(formElement);

    formDataObj.append("old_image", imageUrl);
    formDataObj.append("id", id);

    if (selectedImages[index]) {
      formDataObj.append("image", selectedImages[index]);
    }

    router.post(route("edit.product.image"), formDataObj, {
      onError: (error) => console.error("There was an error", error),
    });
  };

  return (
    <>
      {open && (
        <DeleteComponent
          open={open}
          handleOpen={handleOpenDelete}
          handleClose={handleCloseDelete}
          id={deleteId}
          path="/delete/product/image"
          message="Are you sure you want to delete this image ?"
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
                variant="h3"
                color="blue-gray"
                className="dark:text-white"
              >
                All of the product images
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="blue-gray"
                onClick={handleDialogOpen}
              >
                <PlusIcon strokeWidth={3.5} className="h-4 w-4" /> Add an image
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
              {images
                .filter((image) => image.is_primary !== 1)
                .map((image, index) => {
                  const isLast = index === images.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50/25";
                  return (
                    <>
                      <tr key={image.url} className="text-gray-900">
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              variant="rounded"
                              src={image.url}
                              alt={image.url}
                              size="xxl"
                              className="border-1 border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <form
                            onSubmit={(e) =>
                              submitProductImage(e, image.url, index)
                            }
                          >
                            <div className="flex gap-3">
                              <input
                                name="old_image"
                                type="hidden"
                                value={image.url}
                              />
                              <Button
                                variant="gradient"
                                className="flex items-center justify-center gap-3"
                                color="blue"
                                onClick={() => handleButtonClick(index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                  />
                                </svg>
                                Upload a Picture
                              </Button>
                              <input
                                type="file"
                                name="image"
                                accept="image/*"
                                ref={(el) =>
                                  (fileInputRefs.current[index] = el)
                                }
                                onChange={(e) => handleImageChange(e, index)}
                                className="hidden"
                              />
                              <Button
                                variant="outlined"
                                type="submit"
                                className="flex items-center justify-center gap-3"
                                color="blue"
                              >
                                Save
                              </Button>
                            </div>
                          </form>
                        </td>
                        <td className={classes}>
                          <aside className="mt-4">
                            <Avatar
                              src={selectedImages[index]}
                              alt="picture"
                              withBorder={true}
                              color="blue"
                              size="xxl"
                              variant="rounded"
                            />
                          </aside>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton
                              variant="outlined"
                              className="mr-2 bg-transparent dark:bg-[rgb(37,99,235)] dark:border-white"
                              onClick={() => handleEditClick(id)}
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
                                setDeleteId(image.id);
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
                    </>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm">
            Previous
          </Button>

          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default EditProductImages;
