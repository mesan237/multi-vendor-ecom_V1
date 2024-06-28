import React, { useState } from "react";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

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
  Input,
} from "@material-tailwind/react";
// import EditCategory from "./EditCategory";
import { Link, router } from "@inertiajs/react";
import DeleteComponent from "@/Components/DeleteComponents";

const TABLE_HEAD = ["Image", "subcategories", "Actions"];

export function EditProductImages({ auth, images }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for the delete modal
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const handleOpenDelete = () => setOpen(true);
  const handleCloseDelete = () => setOpen(false);
  const deleteCategory = (id) => {
    router.delete(`/delete/${id}/category/`);
  };

  const handleOpen = () => setIsModalOpen(true);

  const handleEditClick = (id) => {
    axios
      .get(`/api/images/${id}/edit`)
      .then((response) => {
        setSelectedCategory(response.data);
        handleOpen();
      })
      .catch((error) => {
        console.error("There was an error fetching the category data!", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      {/* {isModalOpen && (
        <EditCategory
          open={isModalOpen}
          category={selectedCategory}
          closeModal={closeModal}
          handleOpen={handleOpen}
        />
      )} */}
      {open && (
        <DeleteComponent
          open={open}
          handleOpen={handleOpenDelete}
          handleClose={handleCloseDelete}
          submit={() => deleteCategory(deleteId)}
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
                variant="h2"
                color="blue-gray"
                className="dark:text-white"
              >
                images
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal dark:text-white"
              >
                List of all images
              </Typography>
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
              {images.map((image, index) => {
                const isLast = index === images.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50/25";

                return (
                  <tr key={image.url} className="text-gray-900">
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={image.urly}
                          alt={image.url}
                          size="xxl"
                          className="border-1 border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal dark:text-white"
                      >
                        12
                      </Typography>
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
