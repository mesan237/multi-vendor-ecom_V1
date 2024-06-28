import InputField from "@/Components/FormsInput/InputField";
import { TrashIcon } from "@heroicons/react/24/solid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import CheckboxField from "@/Components/FormsInput/CheckboxFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EditProductImages from "./EditProductImages";

const EditProduct = function ({ auth, productData }) {
  const [formData, setFormData] = useState({});
  const [value, setValue] = useState("");
  const { data, setData, post, processing, errors, progress } = useForm({
    name: productData.name || "",
    shortDescription: productData.short_description || "",
    category: productData.category || "",
    subcategory: productData.subcategory || "",
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
    images: productData.images || [],
    dimensions: productData.dimensions || {
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
  console.log(productData && productData);
  const allAttributes = Object.keys(productData.allAttributes);

  // primary image selection
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const submitThumbnail = () => {};

  return (
    <AuthenticatedLayout user={auth.user}>
      <Typography variant="h3" color="blue-gray" className="font-bold ">
        Edit A product
      </Typography>
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
                  value={productData?.description}
                  onChange={setValue}
                />
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button variant="gradient" color="blue" onClick={() => {}}>
              <span>Save</span>
            </Button>
          </CardFooter>
        </form>
      </Card>

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
                      onChange={(value) =>
                        handleInputChange(attribute[idx], value)
                      }
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
            <Button variant="gradient" color="blue" onClick={() => {}}>
              <span>Save</span>
            </Button>
          </CardFooter>
        </form>
      </Card>

      <form onSubmit={submitDetails}>
        <div className="col-span-3 sm:col-span-6 gap-3">
          <div className="container mx-auto px-4 py-8">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium dark:text-white"
            >
              Previous Images :
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.images.map((image, index) => (
                <div key={index} className="h-64 shadow-lg ">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

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
        <Button variant="gradient" color="blue" onClick={() => {}}>
          <span>Update</span>
        </Button>
      </form>

      <Card className="h-full w-full dark:bg-components-dark dark:text-white px-8 mb-6">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none dark:text-white dark:bg-components-dark"
        ></CardHeader>

        <form onSubmit={submitThumbnail}>
          <CardBody className="overflow-auto px-3 ">
            <div className="grid grid-cols-6 gap-6">
              {productData.images
                .filter((image) => image.is_primary === 1)
                .map((image, index) => (
                  <div key={index} className="h-64 shadow-lg">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
            </div>
            <div className="w-full">
              <Input
                labelProps={{
                  className: "hidden",
                }}
                name="category_image"
                color="blue"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full py-2 px-32 border border-gray-300 rounded-lg shadow-sm overflow-auto relative
                      focus:outline-none focus:border-blue-500
                      file:mr-4 file:absolute file:top-0 file:left-0 file:p-2.5 file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100"
              />
            </div>
            <input name="product_id" type="hidden" value={productData.id} />
            <div className="col-span-6 md:col-span-3 mr-auto">
              {selectedImage && (
                <aside className="mt-4 flex justify-center md:justify-end">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="max-w-full h-24 rounded-lg shadow-md"
                  />
                </aside>
              )}
            </div>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button variant="gradient" color="blue" onClick={() => {}}>
              <span>Save</span>
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Typography
        variant="h3"
        color="blue-gray"
        className="mb-2 font-medium dark:text-white"
      >
        Product images
      </Typography>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <EditProductImages images={productData.images} />
      </CardFooter>
    </AuthenticatedLayout>
  );
};

export default EditProduct;
