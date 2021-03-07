import { Avatar } from "@material-ui/core";
import React from "react";
import "./price.css";

function Price() {
  return (
    <div className="price__container">
      <div className="price__text">
        <h3>Our Best Price</h3>
        <p>
          EV Smart provides you best price to charge your car, it gives access to not only
          commercial stations but also to house stations.{" "}
        </p>
        <br></br>
        <br></br>
        <p>
         Just sign up with EV smart and get started to explore new world of charging stations.
         Click on sign up to start{" "}
        </p>
        <div className="small">
          <Avatar /> <small>Ev smart</small>
        </div>
      </div>
      <div className="price__image">
        <img
          className="price__list"
          src="./images/price.jpg"
          alt="price list"
        />
      </div>
    </div>
  );
}

export default Price;
