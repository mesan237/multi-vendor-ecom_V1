import React from "react";
import { Checkbox, Typography } from "@material-tailwind/react";

const CheckboxField = ({ label, checked, onChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <Typography variant="h6" className="-mb-1 dark:text-white">
        {label}
      </Typography>
      <Checkbox label={label} checked={checked} onChange={onChange} />
    </div>
  );
};

export default CheckboxField;
