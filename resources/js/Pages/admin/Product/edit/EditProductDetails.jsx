import CheckboxField from "@/Components/FormsInput/CheckboxFields";
import InputField from "@/Components/FormsInput/InputField";
import { router, useForm } from "@inertiajs/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditProductDetails = ({ productData }) => {
  const [formData, setFormData] = useState({});
  const [value, setValue] = useState(productData?.description);
  const { data, setData, post, processing, errors } = useForm({
    id: productData.id,
    name: productData.name || "",
    shortDescription: productData.short_description || "",
    color: productData.color || "",
    material: productData.material || "",
    price: productData.price || "",
    stock: productData.stock || "",
    assemblyRequired: productData.assembly_info || false,
    type: productData.type || "",
    style: productData.style || "",
    design: productData.design || "",
    features: productData.features || "",
    brand: productData.brand || "",
    warranty: productData.warranty || "",
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      ...data,
      longDescription: value,
    }));
  }, [data, value]);

  const submitDetails = (e) => {
    e.preventDefault();
    router.put(route("update.product.details"), formData, {
      onError: (error) => console.error("There was an error", error),
    });
  };
  const handleDescChange = (value) => {
    setValue(value);
  };
  return (
    <Card className="h-full w-full dark:bg-components-dark dark:text-white px-8 mb-6">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none dark:text-white dark:bg-components-dark"
      >
        Basic Datas
      </CardHeader>

      <form onSubmit={submitDetails} className="mx-4">
        <CardBody className="overflow-auto px-3 ">
          <div className="grid grid-cols-6 gap-6 mb-6">
            <InputField
              label="Name of the furniture"
              name="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            <InputField
              label="Price"
              name="price"
              value={data.price}
              onChange={(e) => setData("price", e.target.value)}
            />
            <InputField
              label="Material"
              name="material"
              value={data.material}
              onChange={(e) => setData("material", e.target.value)}
            />

            <InputField
              label="Quantity"
              name="stock"
              value={data.stock}
              onChange={(e) => setData("stock", e.target.value)}
            />
            <InputField
              label="Brand"
              name="brand"
              value={data.brand}
              onChange={(e) => setData("brand", e.target.value)}
            />
            <InputField
              label="Style"
              name="style"
              value={data.style}
              onChange={(e) => setData("style", e.target.value)}
            />
            <InputField
              label="Type"
              name="type"
              value={data.type}
              onChange={(e) => setData("type", e.target.value)}
            />

            <InputField
              label="Warranty"
              name="warranty"
              value={data.warranty}
              onChange={(e) => setData("warranty", e.target.value)}
            />
          </div>
          <input type="hidden" name="product_id" value={data.id} />
          <CheckboxField
            label="Assembly required"
            checked={data.assemblyRequired}
            onChange={(e) => setData("assemblyRequired", e.target.checked)}
          />

          <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
            <Typography variant="h6" className="-mb-1 dark:text-white">
              short description
            </Typography>
            <Textarea
              color="gray"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.shortDescription}
              onChange={(e) => setData("shortDescription", e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
            />
          </div>
          <div className="col-span-3 sm:col-span-6 gap-3">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium dark:text-white"
              >
                Long Description:
              </Typography>
              <ReactQuill
                theme="snow"
                className="dark:bg-components-dark py-1 dark:text-white"
                value={value}
                onChange={handleDescChange}
              />
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="gradient" color="blue" type="submit">
            <span>Save</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EditProductDetails;
