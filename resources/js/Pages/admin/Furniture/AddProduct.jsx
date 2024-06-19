import { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";

const AddProduct = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Add product
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add product</strong>
        </Modal.Header>
        {/* <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">furniture name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Apple iMac 27"'
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Apple"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="$2300"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="producTable.Celletails">
                  furniture details
                </Label>
                <Textarea
                  id="producTable.Celletails"
                  name="producTable.Celletails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body> */}
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="name">Furniture Name</Label>
                <TextInput
                  id="name"
                  name="name"
                  placeholder="e.g. Modern Sofa"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="furniture_type">Furniture Type</Label>
                <TextInput
                  id="furniture_type"
                  name="furniture_type"
                  placeholder="e.g. Sofa"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="sub_category_name">Sub Category Name</Label>
                <TextInput
                  id="sub_category_name"
                  name="sub_category_name"
                  placeholder="e.g. Living Room"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dimensions">Dimensions</Label>
                <TextInput
                  id="dimensions"
                  name="dimensions"
                  placeholder="e.g. Height: 35 in, Width: 80 in, Depth: 35 in"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="material">Material</Label>
                <TextInput
                  id="material"
                  name="material"
                  placeholder="e.g. Leather"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <TextInput
                  id="color"
                  name="color"
                  placeholder="e.g. Black"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="e.g. 2300.00"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="discounted_price">Discounted Price</Label>
                <TextInput
                  id="discounted_price"
                  name="discounted_price"
                  type="number"
                  placeholder="e.g. 2000.00"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="in_stock">Stock</Label>
                <select
                  id="in_stock"
                  name="in_stock"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <TextInput
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="e.g. 50"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Detailed description of the furniture"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="warranty">Warranty</Label>
                <Textarea
                  id="warranty"
                  name="warranty"
                  placeholder="e.g. 5 years"
                  rows={2}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="assembly_info">Assembly Information</Label>
                <Textarea
                  id="assembly_info"
                  name="assembly_info"
                  placeholder="e.g. Assembly required, tools included"
                  rows={2}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="tags">Tags</Label>
                <Textarea
                  id="tags"
                  name="tags"
                  placeholder="e.g. modern, comfortable"
                  rows={2}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="additional_features">Additional Features</Label>
                <Textarea
                  id="additional_features"
                  name="additional_features"
                  placeholder="e.g. Built-in USB ports"
                  rows={2}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="video">Video</Label>
                <TextInput
                  id="video"
                  name="video"
                  placeholder="URL of product video"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="type">Type</Label>
                <TextInput
                  id="type"
                  name="type"
                  placeholder="e.g. Recliner"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="features">Features</Label>
                <Textarea
                  id="features"
                  name="features"
                  placeholder="e.g. Adjustable headrest, Lumbar support"
                  rows={2}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="style">Style</Label>
                <TextInput
                  id="style"
                  name="style"
                  placeholder="e.g. Contemporary"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="design">Design</Label>
                <TextInput
                  id="design"
                  name="design"
                  placeholder="e.g. Ergonomic"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="² h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProduct;
