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
import EditCategory from "./EditCategory";
import { Link, router } from "@inertiajs/react";
import DeleteComponent from "@/Components/DeleteComponents";

const TABLE_HEAD = ["attribute name", "Actions"];

export function AllAttributes({ auth, attributes }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for the delete modal
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const handleOpenDelete = () => setOpen(true);
  const handleCloseDelete = () => setOpen(false);
  const deleteCategory = (id) => {
    router.delete(`/delete/${id}/attribute/`);
  };

  const handleOpen = () => setIsModalOpen(true);

  const handleEditClick = (id) => {
    axios
      .get(`/api/attributes/${id}/edit`)
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
          All attributes
        </a>
      </Breadcrumbs>
      {isModalOpen && (
        <EditCategory
          open={isModalOpen}
          category={selectedCategory}
          closeModal={closeModal}
          handleOpen={handleOpen}
        />
      )}
      {open && (
        <DeleteComponent
          open={open}
          handleOpen={handleOpenDelete}
          handleClose={handleCloseDelete}
          submit={() => deleteCategory(deleteId)}
          message="Are you sure you want to delete this category ?"
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
                attributes
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal dark:text-white"
              >
                List of all attributes
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
              {attributes.map(({ attribute_name, id }, index) => {
                const isLast = index === attributes.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50/25";

                return (
                  <tr key={id} className="text-gray-900">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal dark:text-white"
                      >
                        {attribute_name}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Edit Category">
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

                      <Tooltip content="Delete Category">
                        <IconButton
                          variant="outlined"
                          onClick={() => {
                            handleOpenDelete();
                            setDeleteId(id);
                            console.log(open);
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

export default AllAttributes;
