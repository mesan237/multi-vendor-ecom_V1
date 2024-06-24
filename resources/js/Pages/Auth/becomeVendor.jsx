import NavbarMenu from "@/Components/NavbarMenu";
import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import Footer from "../frontend/Footer";

const becomeVendor = ({ auth }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    phone: "",
    shopName: "",
    username: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("vendor.register"));
  };

  return (
    <>
      <NavbarMenu auth={auth} />
      <div className="flex flex-col items-center justify-center px-6 lg:gap-y-12 x">
        <div className="my-6 flex items-center gap-x-1 lg:my-0"></div>
        <Card
          color="transparent"
          className="w-full md:max-w-screen-sm shadow-none [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
        >
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={submit}
          >
            <Typography variant="h1" color="blue-gray">
              Become a vendor
            </Typography>
            <Typography>
              Already have a vendor account?
              <Link
                href={route("login")}
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {" "}
                Login
              </Link>
            </Typography>
            {/* <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography> */}

            <div className="mb-1 flex flex-col gap-3">
              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Your username
              </Typography>
              <Input
                type="text"
                size="lg"
                value={data.username}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setData("username", e.target.value)}
              />
              <InputError message={errors.username} className="mt-2" />

              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Your shop name
              </Typography>
              <Input
                size="lg"
                type="text"
                value={data.shopName}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setData("shopName", e.target.value)}
              />
              <InputError message={errors.shopName} className="mt-2" />

              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Your phone number
              </Typography>
              <Input
                size="lg"
                type="number"
                value={data.phone}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setData("phone", e.target.value)}
              />
              <InputError message={errors.phone} className="mt-2" />

              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Your Email
              </Typography>
              <Input
                size="lg"
                type="email"
                value={data.email}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setData("email", e.target.value)}
              />
              <InputError message={errors.email} className="mt-2" />

              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <InputError message={errors.password} className="mt-2" />

              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Confirm Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <InputError
                message={errors.password_confirmation}
                className="mt-2"
              />
            </div>
            <div className="mb-6 flex items-center justify-between">
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    Accept the terms and conditions
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
            </div>

            <Button type="submit" className="mt-6" fullWidth={false}>
              Register your account
            </Button>
          </form>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default becomeVendor;
