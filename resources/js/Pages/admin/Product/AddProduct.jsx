import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useForm, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Breadcrumbs,
  Button,
  Checkbox,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import CheckboxField from "@/Components/FormsInput/CheckboxFields";
import InputField from "@/Components/FormsInput/InputField";

const AddProduct = function ({ auth, attributes, allcategories }) {
  const { flash } = usePage().props;

  const [formData, setFormData] = useState({});
  const [value, setValue] = useState("");

  // updating informations
  const { data, setData, post, processing, errors, progress } = useForm({
    name: "",
    shortDescription: "",
    category: "",
    subcategory: "",
    color: "",
    material: "",
    price: "",
    stock: "",
    assemblyRequired: false,
    type: "",
    style: "",
    design: "",
    features: "",
    brand: "",
    warranty: "",
    images: [],
    dimensions: { height: "", width: "", length: "", depth: "" },
  });
  // for select inputs
  const handleInputChange = (attribute_name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        [attribute_name]: value,
      },
    }));
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      ...data,
      longDescription: value,
    }));
  }, [data, value]);

  // handling images
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews([...previews, ...newImages]);
    setData("images", [...data.images, ...files]);
    console.log(data.images);
  };

  const handleDelete = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newImages = data.images.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    setData("images", newImages);
  };

  // Handling category and subcategory
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const handleCategoryChange = (value) => {
    setData("category", value);
    const category = allcategories.find((cat) => cat.category_name === value);
    setSubcategories(category ? category.subcategories : []);
  };

  // sending datas
  const submitDetails = (e) => {
    e.preventDefault();
    router.post(route("save.product"), formData, {
      onError: (error) => console.error("There was an error", error),
    });
  };
  // console.log(attributes && attributes);
  return (
    <AuthenticatedLayout user={auth.user}>
      <Breadcrumbs
        separator={<ChevronRightIcon className="w-4 h-4" strokeWidth={2} />}
        className="mb-1 bg-white dark:bg-page-dark pl-0"
      >
        <a href="#" className="opacity-60 font-bold dark:text-white">
          Dashboard
        </a>
        <a href="#" className="font-extrabold dark:text-white">
          Add product
        </a>
      </Breadcrumbs>
      <Typography
        variant="h1"
        className="mb-4 text-xl font-bold text-gray-900 dark:text-white"
      >
        Add a Product
      </Typography>

      <div>
        <div className="col-span-2 xl:col-span-4">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-800 sm:p-6 dark:bg-components-dark">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Add a product
            </h3>
            <form onSubmit={submitDetails}>
              <div className="grid grid-cols-6 gap-6">
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

                <CheckboxField
                  label="Assembly required"
                  checked={data.assemblyRequired}
                  onChange={(e) =>
                    setData("assemblyRequired", e.target.checked)
                  }
                />

                <div className="col-span-3 sm:col-span-6 flex flex-wrap gap-3">
                  {attributes &&
                    attributes.map(
                      ({ attribute_name, id, attributes_values }, idx) => (
                        <div className="" key={idx}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium dark:text-white"
                          >
                            {attribute_name}
                          </Typography>

                          <Select
                            size="lg"
                            labelProps={{ className: "hidden" }}
                            onChange={(value) =>
                              handleInputChange(attribute_name, value)
                            }
                            className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                          >
                            {attributes_values.map(
                              ({ attribute_value }, index) => (
                                <Option
                                  key={`${idx}-${index}`}
                                  value={attribute_value}
                                >
                                  {attribute_value}
                                </Option>
                              )
                            )}
                          </Select>
                        </div>
                      )
                    )}
                  {/* category and subcategory sections */}
                  {/* category and subcategory sections */}
                  <div className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium dark:text-white"
                    >
                      Category
                    </Typography>

                    <Select
                      size="lg"
                      labelProps={{ className: "hidden" }}
                      onChange={handleCategoryChange} // Corrected this line
                      className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                      {allcategories.map((category, index) => (
                        <Option key={index} value={category.category_name}>
                          {category.category_name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium dark:text-white"
                    >
                      Subcategory
                    </Typography>

                    <Select
                      size="lg"
                      labelProps={{ className: "hidden" }}
                      onChange={(value) => setData("subcategory", value)}
                      className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                      {subcategories.map((subcategory, index) => (
                        <Option
                          key={index}
                          value={subcategory.subcategory_name}
                        >
                          {subcategory.subcategory_name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium dark:text-white"
                    >
                      Color
                    </Typography>

                    <Select
                      size="lg"
                      labelProps={{ className: "hidden" }}
                      onChange={(value) => setData("color", value)}
                      className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                      <Option>Red</Option>
                      <Option>Pink</Option>
                      <Option>purple</Option>
                      <Option>deepPurple</Option>
                      <Option>indigo</Option>
                      <Option>blue</Option>
                      <Option>lightBlue</Option>
                      <Option>cyan</Option>
                      <Option>teal</Option>
                      <Option>green</Option>
                      <Option>lightGreen</Option>
                      <Option>lime</Option>
                      <Option>yellow</Option>
                      <Option>orange</Option>
                      <Option>gray</Option>
                      <Option>brown</Option>
                      <Option>amber</Option>
                    </Select>
                  </div>
                </div>

                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-bold "
                >
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
                    onChange={(e) =>
                      setData("shortDescription", e.target.value)
                    }
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
                      // value={value}
                      onChange={setValue}
                    />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-6 gap-3">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium dark:text-white"
                    >
                      Upload Furniture Images :
                    </Typography>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                    />
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {previews.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.url}
                            alt={`Uploaded ${index}`}
                            className="w-full h-auto object-cover rounded-lg"
                          />
                          <IconButton
                            variant="outlined"
                            onClick={() => handleDelete(index)}
                            className="border-gray-300 dark:border-white bg-transparent dark:bg-[rgb(224,36,36)] absolute top-2 right-2 bg-red-500 text-white p-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                          >
                            <TrashIcon
                              className="h-4 w-4 text-white dark:text-white"
                              color="red"
                            />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                    {progress && (
                      <div className="w-full bg-gray-200 rounded-full mt-4">
                        <div
                          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                          style={{ width: `${progress.percentage}%` }}
                        >
                          {progress.percentage}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-6 sm:col-full">
                  <Button
                    variant="gradient"
                    type="submit"
                    color="blue"
                    className="dark:bg-blue-500"
                  >
                    Save product
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AddProduct;
