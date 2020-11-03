import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { name: "", phone: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().max(50).required().label("Full Name"),
    phone: Joi.string()
      .regex(/\d{3}-\d{3}-\d{4}/)
      .required()
      .label("Phone Number"),
    email: Joi.string()
      .email()
      .min(5)
      .max(255)
      .required()
      .label("E-Mail Address"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex);
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form
        style={{ display: "flex", flexDirection: "column", margin: "30px" }}
        onSubmit={this.handleSubmit}
      >
        <h1 style={{ textAlign: "center" }}>Register an Account</h1>
        {this.renderInput("name", "Full Name")}
        {this.renderInput("phone", "Phone Number", "text", "xxx-xxx-xxxx")}
        {this.renderInput(
          "email",
          "E-mail Address",
          "email",
          "address@domain.com"
        )}
        {this.renderInput(
          "password",
          "Password",
          "password",
          "5 characters minimum"
        )}
        <div style={{ margin: "auto" }}>{this.renderButton("Register")}</div>
      </form>
    );
  }
}

export default RegisterForm;
