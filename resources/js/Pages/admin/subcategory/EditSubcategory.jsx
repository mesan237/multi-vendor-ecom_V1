import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";

export default function EditSubcategory({
  open,
  closeModal,
  handleOpen,
  categories,
}) {
  const { data, setData, post } = useForm({
    subcategory_name: "",
    category_name: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("store.subcategory"));
    closeModal();
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="dark:bg-components-dark"
      >
        <DialogHeader className="dark:text-white">Add category</DialogHeader>
        <form onSubmit={submit}>
          <DialogBody className="flex gap-3">
            <div className="col-span-6 md:col-span-3 w-1/2 ">
              <label className="block text-sm text-gray-700 dark:text-white py-3 font-extrabold">
                attribute Name
              </label>
              <Input
                name="subcategory_name"
                color="blue"
                type="text"
                value={data?.subcategory_name}
                onChange={(e) => setData("subcategory_name", e.target.value)}
                className="w-full input-default"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="col-span-6 md:col-span-3 w-1/2 ">
              <label className="block text-sm text-gray-700 dark:text-white py-3 font-extrabold">
                Select a subcategory
              </label>
              <Select
                size="lg"
                labelProps={{ className: "hidden" }}
                onChange={(value) => setData("category_name", value)}
                className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
              >
                {categories.map(({ category_name }, index) => (
                  <Option key={index} value={category_name}>
                    {category_name}
                  </Option>
                ))}
              </Select>
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
              <span>Add subcategory</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
