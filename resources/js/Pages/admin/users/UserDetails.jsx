import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import ConfirmationDialog from "@/Components/ConfirmationDialog";
import DeactivateVendor from "./DeactivateVendor";

export function UserDetails({ closeDrawer, open, vendor_id }) {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const handleOpen = () => setOpenConfirmation(true);
  const handleClose = () => setOpenConfirmation(false);

  // const { data, setData, post } = useForm({
  //   id: "",
  // });

  // const handleActivation = (e) => {
  //   e.preventDefault();
  //   post(route("active.vendor"));
  // };

  // Deactivate vendor
  const [openDeactivateConf, setOpenDeactivateConf] = useState(false);
  const handleOpenDeactivate = () => setOpenDeactivateConf(true);
  const handleCloseDeactivate = () => setOpenDeactivateConf(false);

  return (
    <>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4"
        placement="right"
        overlay={false}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Vendor Details
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          Material Tailwind features multiple React and HTML components, all
          written with Tailwind CSS classes and Material Design guidelines.
        </Typography>

        <Button size="sm" variant="outlined" color="green" onClick={handleOpen}>
          Activate vendor
        </Button>
        <Button
          size="sm"
          variant="outlined"
          color="red"
          onClick={handleOpenDeactivate}
        >
          Deactivate vendor
        </Button>

        {openConfirmation && (
          <ConfirmationDialog
            open={openConfirmation}
            handleClose={handleClose}
            handleOpen={handleOpen}
            title="Activate Confirmation"
            message="Are you sure you want to activate this vendor account ?"
            labelButton="Activate vendor"
            id={vendor_id}
          />
        )}

        {openDeactivateConf && (
          <DeactivateVendor
            open={openDeactivateConf}
            handleClose={handleCloseDeactivate}
            handleOpen={handleOpenDeactivate}
            title="Deactivate Confirmation"
            message="Are you sure you want to deactivate this vendor account ?"
            labelButton="Deactivate vendor"
            id={vendor_id}
          />
        )}
      </Drawer>
    </>
  );
}

export default UserDetails;
