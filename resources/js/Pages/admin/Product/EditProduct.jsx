import { Button } from "@material-tailwind/react";
import { useState } from "react";

const EditProduct = function ({}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="green" onClick={() => setOpen(!isOpen)}>
        Edit Product
      </Button>
    </>
  );
};

export default EditProduct;
