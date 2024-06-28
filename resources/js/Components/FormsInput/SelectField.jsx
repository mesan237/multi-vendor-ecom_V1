import React from "react";
import { Select, Option, Typography } from "@material-tailwind/react";

const SelectField = ({ label, name, value, options, onChange }) => {
  return (
    <div className="col-span-6 sm:col-span-3 flex flex-col gap-3">
      <Typography variant="h6" className="-mb-1 dark:text-white">
        {label}
      </Typography>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        className="!border-t-blue-gray-200 focus:!border-t-gray-900 select-default"
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectField;
