import React from "react";
import { Checkbox } from "@material-tailwind/react";

const CheckboxField = ({ label, checked, onChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label={label} checked={checked} onChange={onChange} />
    </div>
  );
};

export default CheckboxField;
