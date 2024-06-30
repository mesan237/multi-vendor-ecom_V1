import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Input,
  Typography,
  Alert,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import profile from "/public/uploads/admin_images/default-profile.png";
import { UploadPhoto } from "@/Components/UploadPhoto";
import { useForm, usePage } from "@inertiajs/react";

const AdminProfile = ({ adminUser }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const { flash } = usePage().props;
  // updating informations
  const { data, setData, post, processing, errors } = useForm({
    email: adminUser?.email,
    name: adminUser?.name,
    username: adminUser?.username,
    address: adminUser?.address || "",
    phone: adminUser?.phone || "",
  });

  const submitDetails = (e) => {
    e.preventDefault();
    try {
      post(route("admin.profile.store"));
    } catch (error) {
      console.error("There was an error", error);
    }
  };

  const [showAlert, setShowAlert] = useState(!!flash.message);

  return (
    <AuthenticatedLayout user={adminUser}>
      <Breadcrumbs
        separator={<ChevronRightIcon className="w-4 h-4" strokeWidth={2} />}
        className="mb-1 bg-white dark:bg-page-dark pl-0"
      >
        <a href="#" className="opacity-60 font-bold dark:text-white">
          Dashboard
        </a>
        <a href="#" className="opacity-60 font-bold dark:text-white">
          Profile
        </a>
        <a href="#" className="font-extrabold dark:text-white">
          Profile
        </a>
      </Breadcrumbs>
      <Typography
        variant="h1"
        className="mb-4 text-xl font-bold text-gray-900 dark:text-white"
      >
        User Settings
      </Typography>
      {flash.message && (
        <Alert
          icon={<CheckCircleIcon className="size-6" />}
          className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
        >
          {flash.message}
        </Alert>
      )}
      <div className=" md:flex md:flex-col lg:grid lg:grid-cols-3 col-span-full xl:col-auto gap-4 xl:grid-cols-6">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6 dark:bg-components-dark dark-components col-span-1 xl:col-span-2 h-fit">
          <div className="items-center sm:flex sm:flex-col sm:justify-center xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4 gap-4">
            <Avatar
              src={
                adminUser?.photo
                  ? `/uploads/admin_images/${adminUser.photo}`
                  : profile
              }
              alt="admin profile picture"
              withBorder={true}
              className="border border-blue-500 shadow-xl shadow-blue-900/20 ring-4 ring-blue-500/30"
              color="blue"
              size="xxl"
            />
            <div>
              <Typography
                variant="h3"
                className="mb-1 text-xl font-bold text-gray-900 dark:text-white text-center"
              >
                {adminUser?.username}
              </Typography>
              <Typography
                variant="h4"
                className="mb-4 text-sm text-gray-500 dark:text-gray-100 text-center"
              >
                {adminUser?.email}
              </Typography>

              <div className="flex items-center space-x-4">
                <Button onClick={handleOpen} variant="gradient">
                  UploadPhoto
                </Button>
                <UploadPhoto
                  open={open}
                  handleOpen={handleOpen}
                  adminUser={adminUser}
                />
                <Button type="button" variant="outlined" color="red">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 xl:col-span-4">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-800 sm:p-6 dark:bg-components-dark">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              General information
            </h3>
            <form onSubmit={submitDetails}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Name
                  </Typography>
                  <Input
                    size="lg"
                    name="name"
                    value={data.name}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography className="-mb-1 dark:text-white">
                    Username
                  </Typography>
                  <Input
                    size="lg"
                    name="username"
                    value={data.username}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("username", e.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Email
                  </Typography>
                  <Input
                    size="lg"
                    name="email"
                    value={data.email}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("email", e.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Phone Number
                  </Typography>
                  <Input
                    size="lg"
                    name="phone"
                    placeholder="phone"
                    value={data.phone}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("phone", e.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Address
                  </Typography>
                  <Input
                    size="lg"
                    name="address"
                    placeholder="phone"
                    value={data.address}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setData("address", e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-full">
                  <Button
                    variant="gradient"
                    type="submit"
                    color="blue"
                    className="dark:bg-blue-500"
                  >
                    Save Info
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6 dark:bg-components-dark dark-components">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Password information
            </h3>
            <form action="#">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Username
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Username"
                    value=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Username
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Username"
                    value=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
                  <Typography variant="h6" className="-mb-1 dark:text-white">
                    Username
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Username"
                    value=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-6 sm:col-full">
                  <Button
                    variant="gradient"
                    type="submit"
                    color="blue"
                    className="dark:bg-blue-500"
                  >
                    Save all
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminProfile;
