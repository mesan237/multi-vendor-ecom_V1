import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { router, useForm } from "@inertiajs/react";

const EditSelectOption = ({ allAttributes, productData }) => {
  const [formData, setFormData] = useState({});

  const { data, setData, processing, errors } = useForm({
    id: productData.id,
    dimensions: productData.dimensions || {
      height: "",
      width: "",
      length: "",
      depth: "",
    },
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      ...data,
    }));
  }, [data]);

  const submitDetails = (e) => {
    e.preventDefault();
    router.put(route("update.product.select"), formData, {
      onError: (error) => console.error("There was an error", error),
    });
  };

  const handleInputChange = (attribute_name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        [attribute_name]: value,
      },
    }));
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

      <form onSubmit={submitDetails}>
        <CardBody className="overflow-auto px-3 ">
          <div className="grid grid-cols-6 gap-6">
            <Typography variant="h5" color="blue-gray" className="font-bold ">
              Dimensions
            </Typography>
            <div className="col-span-3 sm:col-span-6 flex gap-3">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium dark:text-white"
                >
                  Height
                </Typography>

                <Input
                  size="lg"
                  name="height"
                  type="number"
                  value={data.dimensions.height}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setData("dimensions", {
                      ...data.dimensions,
                      height: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium dark:text-white"
                >
                  Width
                </Typography>
                <Input
                  size="lg"
                  name="width"
                  type="number"
                  value={data.dimensions.width}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setData("dimensions", {
                      ...data.dimensions,
                      width: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium dark:text-white"
                >
                  length
                </Typography>
                <Input
                  size="lg"
                  name="length"
                  type="number"
                  value={data.dimensions.length}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setData("dimensions", {
                      ...data.dimensions,
                      length: e.target.value,
                    })
                  }
                />
              </div>
              <input type="hidden" name="product_id" value={data.id} />
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium dark:text-white"
                >
                  Depth
                </Typography>
                <Input
                  size="lg"
                  name="depth"
                  type="number"
                  value={data.dimensions.depth}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) =>
                    setData("dimensions", {
                      ...data.dimensions,
                      depth: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-span-3 sm:col-span-6 flex flex-wrap gap-3">
              {allAttributes.map((attribute, idx) => (
                <div className="" key={idx}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium dark:text-white"
                  >
                    {attribute}
                  </Typography>

                  <Select
                    size="lg"
                    labelProps={{ className: "hidden" }}
                    onChange={(value) => handleInputChange(attribute, value)}
                    className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                  >
                    {productData.allAttributes[attribute].map(
                      (attribute_value, index) => (
                        <Option
                          key={`${attribute}-${attribute_value}`}
                          value={attribute_value}
                        >
                          {attribute_value}
                        </Option>
                      )
                    )}
                  </Select>
                </div>
              ))}
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

export default EditSelectOption;
