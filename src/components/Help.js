import React from "react";
import Faq from "react-faq-component";
import "./help.css";
import Add from "@material-ui/icons/AddCircleOutline";

const data = {
  title: "How To Use EVSmart",
  rows: [
    {
      title: "How to get direction to any station?",
      content: `After signing in your location will be showed as blue dot on the map. To get to any station
          click on marker of any station. In the popup you will get informaion about station provider, there is
          one button provided (get directions). After clicking you will get directions to that specific location`,
    },
    {
      title: "How to add your charging station?",
      content: `Inside menu drawer, you can see option as "Add station". Click on the add station, you will be taken to
              another page,  on that page provide all the necessary details. To add your location click on the link
              provided at the bottom of page. It will take you the map, after going to map press "Save location". After that
              press "Go back to station". After coming to station your location will be updated with coordinates.
              Now just clicks on the "Save", your station will be added to map. Go to dashboard you will see your
              station on the map.`,
    },
    {
      title: "How to edit your profile?",
      content: `To edit profile, click on menu, after that click on my profile. Inside your profile make changes
          whatever you want and save the changes. `,
    },
    {
      title: "How to update charging station profile?",
      content: `You can update your station profile however you want. Click on station profile, it will take you to
          your charging station profile. In add station you can add your station by submitting a form similarly you
          can change detalis of your station and save the form. Your station will be updated!`,
    },
    {
      title: "How to contact us?",
      content: `If you are facing any issues, you can reach out to us any time. Just click on contact us and
        fill the information and submit your message. We will look into your problem.`,
    },
  ],
};

const styles = {
  bgColor: "black",
  // padding: "200px",
  titleTextColor: "white",
  rowTitleColor: "white",
  rowContentColor: "white",
  arrowColor: "red",
};

const config = {
  animate: true,
  // arrowIcon: Add,
  tabFocus: true,
};

function Help() {
  return (
    <div>
      <div className="help">
        <Faq data={data} styles={{ styles, padding: "5%" }} config={config} />
      </div>
      <div>
        <iframe
          title="Charge your car with EVSmart"
          width="100%"
          height="315"
          className="help__iframe"
          src="https://www.youtube.com/embed/8w64Mg0ih1E"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Help;
