import React from "react";


const InputField = ({ id, label, icon, type = "text", value, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
      {icon}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full outline-none"
      />
    </div>
  </div>
);


export default InputField