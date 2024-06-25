import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";

export default function AddAttribute({ open, closeModal, handleOpen }) {
  const { data, setData, post } = useForm({
    attribute_name: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("store.attribute"));
    closeModal();
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="dark:bg-components-dark"
      >
        <DialogHeader className="dark:text-white">Add Attribute</DialogHeader>
        <form onSubmit={submit}>
          <DialogBody>
            <div className="col-span-6 md:col-span-3 w-1/2 ">
              <label className="block text-sm text-gray-700 dark:text-white py-3 font-extrabold">
                attribute Name
              </label>
              <Input
                name="attribute_name"
                color="blue"
                type="text"
                value={data?.attribute_name}
                onChange={(e) => setData("attribute_name", e.target.value)}
                className="w-full input-default"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={closeModal}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Add attribute</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
