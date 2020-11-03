import React from "react";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("E-mail Address"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <form style={{display: "flex", flexDirection: "column", margin: "30px"}} onSubmit={this.handleSubmit}>
        <h1 style={{textAlign:"center"}}>Login</h1>
        {this.renderInput("email", "E-mail Address")}
        {this.renderInput("password", "Password", "password")}
        <div style={{margin: "auto", textAlign: "center"}}>
        {this.renderButton("Login")}
        <Link to="/register">
          <small className="form-text text-primary">
            Don't have an account? Register here.
          </small>
        </Link>
        </div>
      </form>
    );
  }
}

export default LoginForm;
