import React from "react";
import Customer from "./home components/customer";
import Price from "./home components/Price";
import Start from "./home components/Start";
import Footer from "./navigation/Footer";

function About() {
  return (
    <div style={{ marginTop: "-16px" }}>
      <Customer />
      <Price />
      <Start />
      {/* <Footer /> */}
    </div>
  );
}

export default About;
