import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  // Input,
  Avatar,
} from "@material-tailwind/react";
import profile from "/public/uploads/admin_images/default-profile.png";
import { useForm } from "@inertiajs/react";

export function EditDialogImage({ open, handleOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // updating informations
  const { data, setData, post, processing, errors } = useForm({
    photo: "",
  });

  const submitPhoto = (e) => {
    e.preventDefault();

    post(route("edit.product.image"));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setData("photo", file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const src = selectedImage
    ? selectedImage
    : adminUser?.photo
    ? `/uploads/admin_images/${adminUser.photo}`
    : profile;
  console.log(src);

  return (
    <>
      <Dialog
        open={open}
        size="xs"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="dark:bg-components-dark"
      >
        <DialogHeader className="dark:text-white">
          Edit Product's image
        </DialogHeader>
        <form onSubmit={submitPhoto}>
          <DialogBody>
            <div className="col-span-6 items-center sm:col-span-3 flex flex-col gap-3">
              <aside className="mt-4">
                <Avatar
                  src={src}
                  alt="admin profile picture"
                  withBorder={true}
                  // className="border border-blue-500 shadow-xl shadow-blue-900/20 ring-4 ring-blue-500/30"
                  color="blue"
                  size="xxl"
                />
              </aside>
            </div>
            <div className="flex flex-col gap-3">
              <Typography
                variant="h6"
                className="-mb-1 dark:text-white text-center"
              >
                Profile picture
              </Typography>
              <Button
                variant="gradient"
                className="flex items-center justify-center gap-3"
                color="blue"
                onClick={handleButtonClick}
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
                name="photo"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

              {/* {progress && (
                <progress value={progress.percentage} max="100">
                  {progress.percentage}%
                </progress>
              )} */}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
