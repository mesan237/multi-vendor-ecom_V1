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

export default function EditAttribute({
  open,
  closeModal,
  attribute,
  handleOpen,
}) {
  const { data, setData, post } = useForm({
    attribute_name: attribute?.attribute_name || "",
    id: attribute?.id || "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("update.attribute"));
    closeModal();
  };

  console.log(attribute && attribute);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="dark:bg-components-dark"
      >
        <DialogHeader className="dark:text-white">Edit Attribute</DialogHeader>
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
              <input name="attribute_id" type="hidden" value={data?.id} />
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
              <span>update attribute</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
