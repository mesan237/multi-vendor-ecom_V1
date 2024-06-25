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
import { MuiChipsInput } from "mui-chips-input";

export default function AddAttributeValue({
  open,
  closeModal,
  attribute,
  handleOpen,
}) {
  const { data, setData, post } = useForm({
    id: attribute?.id || "",
    attribute_value: [],
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("add.attribute.value"));
    closeModal();
  };

  const [chips, setChips] = React.useState([]);

  const handleChange = (newChips) => {
    setData("attribute_value", newChips);
    setChips(newChips);
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="dark:bg-components-dark"
      >
        <DialogHeader className="dark:text-white">
          Add an Attribute value
        </DialogHeader>
        <form onSubmit={submit}>
          <DialogBody>
            <div className="flex items-center gap-4">
              <label className="block text-sm text-gray-700 dark:text-white py-3 font-extrabold">
                Attribute name : {attribute?.attribute_name}
              </label>
              {/* <Input
                name="attribute_name"
                color="blue"
                type="text"
                value={data.attribute_value}
                onChange={(e) => setData("attribute_value", e.target.value)}
                className="w-full input-default"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              /> */}
              <input name="attribute_id" type="hidden" value={data?.id} />
            </div>

            <MuiChipsInput value={chips} onChange={handleChange} />
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
              <span>Add value</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
