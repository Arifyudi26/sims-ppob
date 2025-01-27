/* eslint-disable react/prop-types */
import React, { memo } from "react";

const InputWithIcon = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  maxLength,
}) => {
  return (
    <div className="input-group">
      <span
        className="input-group-text"
        style={{
          borderRight: "none",
          backgroundColor: disabled ? "#808080" : "#fff",
          color: "#bebcbc",
          fontSize: 12,
        }}
      >
        {icon}
      </span>
      <input
        type={type}
        className="form-control"
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        value={value}
        onChange={onChange}
        style={{ borderLeft: "none", fontSize: 12 }}
      />
    </div>
  );
};

export default memo(InputWithIcon);
