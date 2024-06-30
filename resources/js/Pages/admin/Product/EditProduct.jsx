import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EditProductImages from "./EditProductImages";
import EditImages from "./edit/EditImages";
import EditProductDetails from "./edit/EditProductDetails";
import EditSelectOption from "./edit/EditSelectOption";

const EditProduct = function ({ auth, productData }) {
  const [formData, setFormData] = useState({});

  const { data, setData, post, processing, errors, reset } = useForm({
    id: productData.id,
    old_image: productData.images.filter((image) => image.is_primary === 1)[0],
    thumbnail: "",
  });
  // adding new product images
  const [openAddImage, setOpenAddImage] = useState(false);
  const handleOpenAddImage = () => setOpenAddImage(true);
  const handleCloseAddImage = () => setOpenAddImage(false);

  // Handling category and subcategory
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const handleCategoryChange = (value) => {
    setData("category", value);
    const category = allcategories.find((cat) => cat.category_name === value);
    setSubcategories(category ? category.subcategories : []);
  };

  // sending datas
  const submitThumbnail = (e) => {
    e.preventDefault();
    post(route("update.product.thumbnail"), {
      preserveScroll: true,
      onSuccess: () => reset("thumbnail"),
    });
  };

  // console.log(productData && productData);
  const allAttributes = Object.keys(productData.allAttributes);

  // primary image selection
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setData("thumbnail", file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
    console.log(data);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      {openAddImage && (
        <EditImages
          open={openAddImage}
          handleOpen={handleOpenAddImage}
          closeModal={handleCloseAddImage}
          product_id={productData.id}
        />
      )}

      <Typography variant="h3" color="blue-gray" className="font-bold ">
        Edit A product
      </Typography>

      <EditProductDetails productData={productData} />

      <EditSelectOption
        allAttributes={allAttributes}
        productData={productData}
      />

      <Card className="h-full w-full dark:bg-components-dark dark:text-white px-8 mb-6">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none dark:text-white dark:bg-components-dark"
        >
          Change the image Thumbnail
        </CardHeader>

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
                name="thumbnail"
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

            <input name="product_id" type="hidden" value={data.id} />
            <input name="old_image" type="hidden" value={data?.old_image} />

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
            <Button variant="gradient" color="blue" type="submit">
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

      <EditProductImages
        images={productData.images}
        handleDialogOpen={handleOpenAddImage}
        id={productData.id}
      />
    </AuthenticatedLayout>
  );
};

export default EditProduct;
