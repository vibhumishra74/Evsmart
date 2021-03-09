import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { fuel } from "../../public/images/fuel.png"
// import { marker } from "./images/marker.png"

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 19.7514798,
      lng: 75.7138884,
      zoom: 6,
    };
  }

  render() {
    const latitude = this.props.coords
      ? this.props.coords.latitude
      : this.state.lat;
    const longitude = this.props.coords
      ? this.props.coords.longitude
      : this.state.lng;
    // console.log("lat", latitude, "log", longitude);
    let getlocation = () => {
      let action = {
        type: "get_location",
        payload: [latitude, longitude],
      };
      if (this.props.dispatch(action)) {
        console.log(`lat ${latitude} and log ${longitude}`);

        return this.props.dispatch(action);
      }
      // return <Link to="/station"> linkskdbvsd </Link>;
    };
    return (
      <div>
        <MapContainer
          center={[latitude, longitude]}
          zoom={this.state.zoom}
          style={{ width: "100%", height: "80vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {!this.props.coords ? (
            <div>Loading...</div>
          ) : (
            <Marker position={[latitude, longitude]}>
              <Popup>
               You are here
              </Popup>
            </Marker>
          )}
        </MapContainer>
        <div>
          <button onClick={getlocation}>Save location</button>
          <Link to="/station"> Back to station </Link>
          <Link to="/station-profile"> Back to station profile </Link>
        </div>
      </div>
    );
  }
}

let location = geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 10000,
})(Map);

function msp(state) {
  console.log("state is ", state);
}

function mdp(dispatch) {
  return {
    dispatch,
  };
}
export default connect(msp, mdp)(location);
