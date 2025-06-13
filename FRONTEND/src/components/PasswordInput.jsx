import React from "react";

const PasswordInput = ({
  id,
  label,
  showPassword,
  togglePassword,
  value,
  onChange,
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full outline-none"
      />
      <button
        type="button"
        onClick={togglePassword}
        className="text-sm text-gray-500 hover:text-gray-700 ml-2"
      >
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  </div>
);


export default PasswordInput