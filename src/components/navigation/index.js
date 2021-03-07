import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomizedMenus from "../Menu";
import "./navigation.css";
import { logout } from "../../utils/index";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

class Index extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //         token: isLoggedin()
  //     }
  // };

  // componentDidUpdate(prevState, prevProps) {
  //   if(!this.state.token){
  //     this.setState({
  //       token : !isLoggedin()
  //     })
  //   }
  // }

  handleLogout = () => {
    logout();
    let action = {
      type: "menu",
      payload: false,
    };
    this.props.dispatch(action);
  };

  render() {
    return !localStorage.getItem("jwt") ? (
      <nav className="">
        <div>
          <div style={{ background_color: "blue" }}>
            <div style={{ background_color: "red" }} className="nav-container ">
              <ul className="lists ">
                <li>
                  <Link className="navbar-brand" to="/dashboard">
                    <img
                      className="navigation__logo"
                      src="./logo.png"
                      alt="logo"
                    />
                  </Link>
                </li>

                <li>
                  <Link className="list" to="/home">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="list nav-link" to="/about">
                    About
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="list nav-link" to="/contact">
                    Contact Us
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    <Button variant="contained" color="primary">
                      Sign In
                    </Button>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    <Button variant="contained" color="primary">
                      Sign up
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    ) : (
      <div style={{ background_color: "red" }} className="nav-container">
        <ul className="lists">
          <li>
            <Link to="/dashboard">
              <img className="navigation__logo" src="./logo.png" alt="logo" />
            </Link>
          </li>

          <li>
            <Link className="list" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="list" to="/about">
              About
            </Link>
          </li>

          <li>
            <Link className="list" to="/contact">
              Contact us
            </Link>
          </li>

          <li className="menu">
            <CustomizedMenus />
          </li>

          <li>
            <Link onClick={this.handleLogout} className="list" to="/sign-in">
              <Button variant="contained" color="primary">
                Logout
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

function msp(state) {
  return {
    menu: state.menu,
  };
}
function mdp(dispatch) {
  return {
    dispatch,
  };
}

export default connect(msp, mdp)(Index);
