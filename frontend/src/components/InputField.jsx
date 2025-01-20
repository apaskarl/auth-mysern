import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const InputField = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  error,
  type = "text",
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const isPasswordField = type === "password";

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 font-semibold">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={isPasswordField && passwordVisible ? "text" : type}
          className={`${error && "border-red-600 text-red-600"} w-64 border bg-gray-100 p-3 font-medium outline-none`}
          required
        />

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        {isPasswordField &&
          (passwordVisible ? (
            <Icon
              icon="fluent:eye-off-24-regular"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-4 cursor-pointer text-2xl opacity-50 duration-200 hover:opacity-100 md:text-xl"
            />
          ) : (
            <Icon
              icon="fluent:eye-24-regular"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-4 cursor-pointer text-2xl opacity-50 duration-200 hover:opacity-100 md:text-xl"
            />
          ))}
      </div>
    </div>
  );
};

export default InputField;
