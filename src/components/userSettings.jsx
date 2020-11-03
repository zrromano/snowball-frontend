import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Form from "./form";
import { updateUser } from "../services/userService";
import { getCurrentUser } from "../services/authService";

class UserSettings extends Form {
  state = {
    data: { name: "", phone: "", email: "", password: "", confirm: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().allow("").max(50).label("Full Name"),
    phone: Joi.string()
      .allow("")
      .regex(/\d{3}-\d{3}-\d{4}/)
      .label("Phone Number"),
    email: Joi.string()
      .allow("")
      .email()
      .min(5)
      .max(255)
      .label("E-Mail Address"),
    password: Joi.string().allow("").min(5).max(255).label("New Password"),
    confirm: Joi.string().required().min(5).max(255).label("Current Password"),
  };

  doSubmit = async () => {
    let user = getCurrentUser();
    let newUser = this.state.data;
    try {
      let response = await updateUser(user, newUser);
      if (response.status === 200) {
        toast("Successfully updated account, logging out...", {
          autoClose: 6000,
        });

        setTimeout((window.location = "/logout"), 6000);
      } else {
        throw response.data;
      }
    } catch (err) {
      toast.error(err);
    }
  };

  render() {
    return (
      <form
        style={{ display: "flex", flexDirection: "column", margin: "30px" }}
        onSubmit={this.handleSubmit}
      >
        <h1 style={{ textAlign: "center" }}>Account Settings</h1>
        <Link
          style={{ textAlign: "center", marginBottom: "20px" }}
          to="/tickets"
        >
          Click here to view your tickets.
        </Link>
        <p style={{ textAlign: "center" }}>
          Fill out the fields you would like to change and enter your current
          password.
        </p>
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
          "New Password",
          "password",
          "5 characters minimum"
        )}
        {this.renderInput(
          "confirm",
          "Current Password",
          "password",
          "Required"
        )}
        <div style={{ margin: "auto" }}>{this.renderButton("Save")}</div>
      </form>
    );
  }
}

export default UserSettings;
