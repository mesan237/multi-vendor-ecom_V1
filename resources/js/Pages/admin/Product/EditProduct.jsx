import InputField from "@/Components/FormsInput/InputField";
import { TrashIcon } from "@heroicons/react/24/solid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import CheckboxField from "@/Components/FormsInput/CheckboxFields";

const EditProduct = function ({ open, closeModal, handleOpen, product }) {
  const [formData, setFormData] = useState({});
  const [value, setValue] = useState("");
  const { data, setData, post, processing, errors, progress } = useForm({
    name: product.name || "",
    shortDescription: product.short_description || "",
    category: product.category || "",
    subcategory: product.subcategory || "",
    color: product.color || "",
    material: product.material || "",
    price: product.price || "",
    stock: product.stock || "",
    assemblyRequired: product.assembly_info || false,
    type: product.type || "",
    style: product.style || "",
    design: product.design || "",
    features: product.features || "",
    brand: product.brand || "",
    warranty: product.warranty || "",
    images: product.images || [],
    dimensions: product.dimensions || {
      height: "",
      width: "",
      length: "",
      depth: "",
    },
  });

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
  console.log(product && product);
  return (
    <>
      <Dialog
        open={open}
        size="lg"
        handler={handleOpen}
        className="  overflow-y-auto max-h-screen"
      >
        <DialogHeader>Edit A product</DialogHeader>
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-800 sm:p-6 dark:bg-components-dark">
          <h3 className="mb-4 text-xl font-semibold dark:text-white">
            Add a product
          </h3>
        </div>
        <form onSubmit={submitDetails}>
          <DialogBody>
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
                onChange={(e) => setData("assemblyRequired", e.target.checked)}
              />
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
                    value={product?.description}
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
            <Button variant="gradient" color="green" onClick={() => {}}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default EditProduct;
