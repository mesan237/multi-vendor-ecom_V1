import React from "react";
import { Input, Typography } from "@material-tailwind/react";

const InputField = ({ label, name, value, onChange }) => {
  return (
    <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
      <Typography variant="h6" className="-mb-1 dark:text-white">
        {label}
      </Typography>
      <Input
        size="lg"
        name={name}
        value={value}
        className="!border-t-blue-gray-200 focus:!border-t-gray-900 input-default"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
