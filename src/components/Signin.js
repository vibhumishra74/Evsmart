import { CastConnectedTwoTone } from "@material-ui/icons";
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signin } from "../fetchingData/api_calls";
import { authenticate } from "../utils/index";
import "./signin.css";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "vardaanmagon1@gmail.com",
      password: "hellohello",
      error: "",
      loading: false,
      user: true,
      redirectToReferrer: false,
    };
  }

  values = this.state;
  setValues = this.setState;
  render() {
    // const [values, setValues] = useState({
    //   email: "vardaanmagon1@gmail.com",
    //   password: "hellohello",
    //   error: "",
    //   loading: false,
    //   user: true,
    //   redirectToReferrer: false,
    // });

    const {
      email,
      password,
      loading,
      error,
      user,
      redirectToReferrer,
    } = this.state;

    const handleChange = (name) => (event) => {
      this.setValues({
        ...this.values,
        error: false,
        [name]: event.target.value,
      });
    };

    const clickSubmit = (event) => {
      event.preventDefault();
      this.setValues({ ...this.values, error: false, loading: true });
      signin({ email, password }).then((data) => {
        console.log(data.user);
        if (
          data == "User doesnt exsist" ||
          data == "Password or Email is incorrect" ||
          data == "Please Enter email and password" ||
          data == "Invalid Email" ||
          data == undefined
        ) {
          if (data == undefined) {
            data = "Down for Maintenance";
          }
          this.setValues({ ...this.values, error: data, loading: false });
        } else {
          authenticate(data);
          if (data.user == "user") {
            console.log("User is user");
            this.setValues({
              ...this.values,
              user: true,
              redirectToReferrer: true,
            });
          }
          if (data.user == "admin") {
            console.log("User is admin");
            this.setValues({
              ...this.values,
              user: false,
              redirectToReferrer: true,
            });
          }

          console.log("Login Succesfull");
          let action = {
            type: "menu",
            payload: true,
          };
          this.props.dispatch(action);
        }
      });
    };

    const signInForm = () => (
      <form className="sign__container">
        <h3>Login</h3>
        <div className="form-group">
          <label>Email address</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );

    const showError = () => (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );

    const showLoading = () =>
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      );

    const redirectUser = (user) => {
      if (redirectToReferrer) {
        if (user) {
          return <Redirect to="/dashboard" />;
        } else {
          return <Redirect to="/admindash" />;
        }
      }
    };

    return (
      <div className="login">
        {showLoading()}
        {showError()}
        {redirectUser(user)}
        {signInForm()}
      </div>
    );
  }
}
function mdp(dispatch) {
  return {
    dispatch,
  };
}
export default connect(null, mdp)(Signin);
