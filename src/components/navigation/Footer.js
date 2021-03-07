import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <div className="footer_container col-12 my-4">
      <ul className="footer_lists">
        <li>
          <Link className="footer_list" to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link className="footer_list" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link to="/">
            <img className="footer_logo" src="./logo.png" alt="logo" />
          </Link>
        </li>
        <li>
          <Link className="footer_list" to="/contact">
            Contact us
          </Link>
        </li>

        <li>
          <Link className="footer_list" to="/sign-up">
            Signup
          </Link>
        </li>
      </ul>
      {/* <br> </br> */}
      <hr></hr>
      <div className="privacy">&copy; 2020-2021 privacy - Terms</div>
    </div>
  );
}

export default Footer;
