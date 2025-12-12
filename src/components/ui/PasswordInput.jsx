import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = React.memo(function PasswordInput({
  label,
  value,
  setValue,
  show,
  toggleShow,
}) {
  return (
    <div className="relative mb-3">
      <input
        type={show ? "text" : "password"}
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 pr-10"
      />

      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
      >
        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  );
});

export default PasswordInput;