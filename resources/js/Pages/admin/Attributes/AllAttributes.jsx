import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import {
  ChevronRightIcon,
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
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Breadcrumbs,
  List,
  ListItem,
} from "@material-tailwind/react";
import AddAttribute from "./AddAttributes";
import { Link, router } from "@inertiajs/react";
import DeleteComponent from "@/Components/DeleteComponents";
import EditAttribute from "./EditAttributes";
import AddAttributeValue from "./AddAttributeValue";

const TABLE_HEAD = ["attribute name", "values", "Actions"];

export function AllAttributes({ auth, attributes }) {
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for the delete modal
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const handleOpenDelete = () => setOpen(true);
  const handleCloseDelete = () => setOpen(false);
  const deleteAttribute = (id) => {
    router.delete(`/delete/${id}/attribute/`);
  };
  // Add attributes
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpen = () => setIsModalOpen(true);
  // Add attribute value
  const [openAddValue, setOpenAddValue] = useState(false);
  const handleOpenAddValue = () => setOpenAddValue(true);
  const handleCloseAddValue = () => setOpenAddValue(false);

  const handleEditClick = (id) => {
    axios
      .get(`/api/attributes/${id}/edit`)
      .then((response) => {
        setSelectedAttribute(response.data);
        handleOpen();
      })
      .catch((error) => {
        console.error("There was an error fetching the Attribute data!", error);
      });
  };

  const [attributeValue, setAttributeValue] = useState(null);

  const handleAddValueClick = (id) => {
    axios
      .get(`/api/attributes/${id}/edit`)
      .then((response) => {
        setAttributeValue(response.data);
        handleOpenAddValue();
      })
      .catch((error) => {
        console.error("There was an error fetching the Attribute data!", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAttribute(null);
  };
  // console.log(attributes && attributes[0].attributes_values[0].attribute_id);
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
          Attribute
        </a>
        <a href="#" className="font-extrabold dark:text-white">
          All attributes
        </a>
      </Breadcrumbs>
      {isModalOpen && (
        <EditAttribute
          open={isModalOpen}
          attribute={selectedAttribute}
          closeModal={closeModal}
          handleOpen={handleOpen}
        />
      )}
      {open && (
        <DeleteComponent
          open={open}
          handleOpen={handleOpenDelete}
          handleClose={handleCloseDelete}
          submit={() => deleteAttribute(deleteId)}
          message="Are you sure you want to delete this attribute ?"
        />
      )}
      {openAdd && (
        <AddAttribute
          open={openAdd}
          handleOpen={handleOpenAdd}
          closeModal={handleCloseAdd}
        />
      )}
      {openAddValue && (
        <AddAttributeValue
          open={openAddValue}
          attribute={attributeValue}
          handleOpen={handleOpenAddValue}
          closeModal={handleCloseAddValue}
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
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              {/* <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<PlusIcon className="h-5 w-5" />}
                  className="dark:text-gray-200"
                />
              </div> */}
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="blue-gray"
                onClick={handleOpenAdd}
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add an attibute
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
              {attributes ? (
                attributes.map(
                  ({ attribute_name, id, attributes_values }, index) => {
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

                        <td className={`w-96 ${classes}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:text-white"
                          >
                            <div className="">
                              {attributes_values.map(
                                ({ attribute_value }, index) => (
                                  <Chip
                                    key={index}
                                    value={attribute_value}
                                    className="rounded-full w-fit inline-block mr-2 mb-1"
                                  />
                                )
                              )}
                            </div>
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Tooltip content="add a value">
                            <Button
                              className="flex items-center gap-3"
                              size="sm"
                              color="light-blue"
                              onClick={() => handleAddValueClick(id)}
                            >
                              <PlusIcon strokeWidth={3.5} className="h-4 w-4" />{" "}
                              Add a value
                            </Button>
                          </Tooltip>

                          <Tooltip content="Edit Attribute">
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

                          <Tooltip content="Delete Attribute">
                            <IconButton
                              variant="outlined"
                              onClick={() => {
                                handleOpenDelete();
                                setDeleteId(id);
                                // console.log(open);
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
                  }
                )
              ) : (
                <tr>No data available yet</tr>
              )}
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
