import React from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  DialogFooter,
} from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export function ConfirmationDialog({
  open,
  handleClose,
  handleOpen,
  message,
  submit,
  title,
  labelButton,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
    handleClose();
  };
  return (
    <section className="grid place-items-center h-screen">
      <Dialog className="p-4" size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-center">
          <Typography color="blue-gray" className="mb-1 font-bold">
            {title}
          </Typography>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody className="flex flex-col items-center gap-y-6 text-center">
            <ExclamationCircleIcon className="text-7xl text-red-600 h-10 w-10" />
            <Typography
              variant="paragraph"
              className="font-normal text-gray-600 max-w-lg"
            >
              {message}
            </Typography>
          </DialogBody>
          <DialogFooter className="flex items-center gap-x-3">
            <Button
              variant="text"
              color="gray"
              onClick={handleClose}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>{labelButton}</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </section>
  );
}

export default ConfirmationDialog;
