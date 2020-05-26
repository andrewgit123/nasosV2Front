import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validateProperty({ name, value }) {
    const schema = { [name]: this.schema[name] };
    const target = { [name]: value };
    const { error } = Joi.validate(target, schema);
    return error ? error.details[0].message : null;
  }
  validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    const errors = {};
    if (!error) {
      return null;
    }

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  }
  handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }

    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    let errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  renderInput({ name, label, type = "text" }) {
    const { data, errors } = this.state;
    return (
      <Input
        data={data}
        errors={errors}
        name={name}
        label={label}
        type={type}
        onChange={this.handleChange}
      />
    );
  }
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
