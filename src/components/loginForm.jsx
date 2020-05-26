import React, { Component } from "react";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const target = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const errors = { ...this.state.errors };
    errors[name] = "";

    const { error } = Joi.validate(target, schema);
    if (error) {
      errors[name] = error.details[0].message;
    }

    this.setState({ errors });

    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };
  render() {
    const { errors, data } = this.state;
    return (
      <form>
        Login Form
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            aria-describedby="username"
            value={data.username}
            onChange={this.handleChange}
          />
          {errors["username"] && (
            <div className="alert alert-danger">{errors["username"]}</div>
          )}
        </div>
      </form>
    );
  }
}

export default LoginForm;
