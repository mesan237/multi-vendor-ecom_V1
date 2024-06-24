import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { router } from "@inertiajs/react";

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
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Breadcrumbs,
  Chip,
} from "@material-tailwind/react";
import UserDetails from "./UserDetails";

const TABLE_HEAD = ["User", "phone", "date", "status", "Actions"];

const VendorsList = ({ auth, vendors }) => {
  const [open, setOpen] = React.useState(false);
  const [uniqId, setUniqId] = React.useState(null);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [vendorDetails, setVendorDetails] = React.useState(null);

  const fetchVendorDetails = (id) => {
    axios
      .get(`/vendor/${id}/details`)
      .then((response) => {
        setVendorDetails(response.data);
        openDrawer();
        setUniqId(id);
      })
      .catch((error) => {
        console.error("There was an error fetching the vendor data!", error);
      });
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
          All Categories
        </a>
      </Breadcrumbs>

      {open && (
        <UserDetails
          open={open}
          closeDrawer={closeDrawer}
          vendorDetails={vendorDetails}
          vendor_id={uniqId}
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
                Vendors
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal dark:text-white"
              >
                List of all vendors
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  className="dark:text-gray-200"
                />
              </div>
              <Button className="flex items-center gap-3" size="sm">
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{" "}
                Download
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
              {vendors.map(
                (
                  { id, username, email, phone, status, created_at, photo },
                  index
                ) => {
                  const isLast = index === vendors.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50/25";

                  const date = new Date(created_at);

                  // Use template literals or string concatenation for formatting
                  const formattedDate = `${date.toLocaleString("en-US", {
                    month: "long",
                  })} ${date.getDate()}, ${date.getFullYear()}`;
                  return (
                    <tr key={email} className="text-gray-900">
                      <td className={classes}>
                        <div className="flex items-center gap-4 text-left">
                          <Avatar
                            src={photo}
                            alt={name}
                            className="border-1 border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="!font-semibold"
                            >
                              {username}
                            </Typography>
                            <Typography
                              variant="small"
                              className="!font-normal text-gray-600"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal dark:text-white"
                        >
                          {phone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal dark:text-white"
                        >
                          {formattedDate}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal dark:text-white"
                        >
                          {status === "1" ? (
                            <Chip
                              className="bg-[#014737] text-[#73cdab] capitalize w-fit pr-3"
                              variant="ghost"
                              // color="green"
                              size="sm"
                              value="active"
                            />
                          ) : (
                            <Chip
                              variant="ghost"
                              className="capitalize w-fit pr-3 bg-red-800 text-red-50"
                              // color="red"
                              size="sm"
                              value="inactive"
                            />
                          )}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton
                            variant="outlined"
                            className="mr-2 bg-transparent dark:bg-[rgb(37,99,235)] dark:border-white"
                            onClick={() => fetchVendorDetails(id)}
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
                }
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
};

export default VendorsList;
