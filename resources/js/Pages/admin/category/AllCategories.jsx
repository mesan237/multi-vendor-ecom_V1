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
import Switcher from "@/Switcher";

const TABLE_HEAD = [
  "Category Image",
  "Category name",
  "subcategories",
  "Actions",
];

const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
  },
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
  },
];

export function AllCategories({ auth, categories }) {
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

      <Card className="h-full w-full dark:bg-components-dark dark:text-white px-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none dark:text-white dark:bg-components-dark"
        >
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="dark:text-white"
              >
                Recent Transactions
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal dark:text-white"
              >
                These are details about the last transactions
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
              {TABLE_ROWS.map(
                (
                  {
                    img,
                    name,
                    amount,
                    date,
                    status,
                    account,
                    accountNumber,
                    expiry,
                  },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50/25";

                  return (
                    <tr key={name} className="text-gray-900">
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={img}
                            alt={name}
                            size="md"
                            className="border-1 border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold dark:text-white"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal dark:text-white"
                        >
                          {amount}
                        </Typography>
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
                          >
                            <PencilSquareIcon
                              color="blue"
                              className="h-4 w-4 dark:text-white"
                            />
                            {/* <PencilIcon className="h-4 w-4" /> */}
                            {/* rgb(224 36 36) */}
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete User">
                          <IconButton
                            variant="outlined"
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
}

// const DeleteCategoryModal = function () {
//   const [isOpen, setOpen] = useState(false);

//   return (
//     <>
//       <Button color="failure" onClick={() => setOpen(!isOpen)}>
//         <HiTrash className="mr-2 text-lg" />
//         Delete item
//       </Button>
//       <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
//         <Modal.Header className="px-3 pt-3 pb-0">
//           <span className="sr-only">Delete product</span>
//         </Modal.Header>
//         <Modal.Body className="px-6 pb-6 pt-0">
//           <div className="flex flex-col items-center gap-y-6 text-center">
//             <HiOutlineExclamationCircle className="text-7xl text-red-600" />
//             <p className="text-lg text-gray-500 dark:text-gray-300">
//               Are you sure you want to delete this product?
//             </p>
//             <div className="flex items-center gap-x-3">
//               <Button color="failure" onClick={() => setOpen(false)}>
//                 Yes, I'm sure
//               </Button>
//               <Button color="gray" onClick={() => setOpen(false)}>
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// const AllCategoriess = ({ auth, categories }) => {
//   return (
//     <AuthenticatedLayout user={auth.user}>
//       <Breadcrumb
//         aria-label="Solid background breadcrumb example"
//         className=" pr-5 py-3 "
//         // className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
//       >
//         <Breadcrumb.Item href="#" icon={HiHome}>
//           Dashboard
//         </Breadcrumb.Item>
//         <Breadcrumb.Item href="#">Manage category</Breadcrumb.Item>
//         <Breadcrumb.Item>All categories</Breadcrumb.Item>
//       </Breadcrumb>

//       <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
//         <Table.Head className="bg-gray-100 dark:bg-gray-700">
//           <Table.HeadCell>
//             <span className="sr-only">Toggle selected</span>
//             <Checkbox />
//           </Table.HeadCell>
//           <Table.HeadCell>Category Image</Table.HeadCell>
//           <Table.HeadCell>Category Name</Table.HeadCell>
//           <Table.HeadCell>subcategories</Table.HeadCell>
//           <Table.HeadCell>Actions</Table.HeadCell>
//         </Table.Head>
//         <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
//           {categories?.map((category) => (
//             <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
//               <Table.Cell className="w-4 p-4">
//                 <Checkbox />
//               </Table.Cell>
//               <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
//                 <div className="text-base font-semibold text-gray-900 dark:text-white">
//                   category.image
//                 </div>
//               </Table.Cell>
//               <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//                 category.name
//               </Table.Cell>
//               <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//                 00
//               </Table.Cell>
//               <Table.Cell className="space-x-2 whitespace-nowrap p-4">
//                 <div className="flex items-center gap-x-3">
//                   {/* <EditProduct /> */}
//                   <DeleteCategoryModal />
//                 </div>
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table>
//     </AuthenticatedLayout>
//   );
// };

export default AllCategories;
