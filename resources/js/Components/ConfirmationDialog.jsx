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
import { useForm } from "@inertiajs/react";

export function ConfirmationDialog({
  open,
  handleClose,
  handleOpen,
  message,
  title,
  labelButton,
  id,
}) {
  const { data, setData, post } = useForm({
    id: id,
  });

  const handleActivation = (e) => {
    e.preventDefault();
    post(route("active.vendor"));
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
        <form onSubmit={handleActivation}>
          <DialogBody className="flex flex-col items-center gap-y-6 text-center">
            <ExclamationCircleIcon className="text-7xl text-red-600 h-10 w-10" />
            <Typography
              variant="paragraph"
              className="font-normal text-gray-600 max-w-lg"
            >
              {message}
            </Typography>

            <input
              type="hidden"
              name="id"
              value={data.id}
              onChange={(e) => setData(id)}
            />
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
