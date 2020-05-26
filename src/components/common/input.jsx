import React from "react";

const Input = ({ data, errors, name, label, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        name={name}
        id={name}
        value={data[name]}
        {...rest}
      />
      {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
    </div>
  );
};

export default Input;
