import React from "react";

const InputForm = ({ label, placeholder }) => {
  return (
    <>
      <Typography variant="h6" color="blue-gray" className="-mb-2">
        {label}
      </Typography>
      <Input
        size="lg"
        placeholder={placeholder}
        value={data.email}
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 border"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        isFocused={true}
        onChange={(e) => setData("email", e.target.value)}
      />
    </>
  );
};

export default InputForm;
