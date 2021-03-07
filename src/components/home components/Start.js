import { Button } from "@material-ui/core";
import React from "react";
import "./start.css";

function Start() {
  return (
    <div className="start__component">
      <h4>Ready To start?</h4>
      <br></br>
      <p>
        Our motto is to provide charging stations at best prices, which will be
        available throughout the world
      </p>
      <Button> Start With us </Button>
    </div>
  );
}

export default Start;
