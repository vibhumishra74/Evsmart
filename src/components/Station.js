import React, { Component } from "react";
// import { TimePicker } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./station.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addCS } from "../fetchingData/api_calls";

class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      open: "",
      close: "",
      location: this.props.location,
      cost: "",
    };
  }

  handleChange = (name) => (event) => {
    this.setState((state) => ({ [name]: event.target.value }));
  };

  clickSubmit = (e) => {
    e.preventDefault();
    this.setState((state) => ({ location: this.props.location }));
    const { phone, open, close, location, cost } = this.state;
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    const lati = location[0];
    const long = location[1];
    addCS({ phone, open, close, long, lati, cost }, token).then((data) => {
      console.log(data);
      if (
        data.length == 16 ||
        data == "YOU CAN ONLY ADD ONE CHARGING STATION."
      ) {
        console.log(data);
        console.log("Error Updating");
      } else {
        this.setState({
          phone: "",
          open: "",
          close: "",
          location: "",
          cost: "",
        });
        console.log("Station added");
      }
    });
  };
  render() {
    return (
      <div className="station">
        <form className="station__container">
          <h3>Add Your Station</h3>

          <div className="form-group">
            <label>Location</label>
            <input
              value={this.props.location}
              className="form-control"
              placeholder="Latitude, Longitude"
              disabled={true}
            />
               <Button
              className="station__setlocation station__location"
              variant="contained"
              color="primary"
            >
              <Link to="/map"> Set Your Location Manually</Link>
            </Button>{" "}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter phone number for station"
              value={this.state.phone}
              onChange={this.handleChange("phone")}
            />
          </div>

          <div className="form-group">
            <label>Working Hours</label>

            <div>
              From :
              <TextField
                id="time"
                ampm={false}
                type="time"
                defaultValue="00:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={this.handleChange("open")}
                value={this.state.open}
              />
              To:
              <TextField
                id="time"
                ampm={false}
                type="time"
                defaultValue="00:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={this.handleChange("close")}
                value={this.state.close}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Charges per Hour (in Rs)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter charges"
              onChange={this.handleChange("cost")}
              value={this.state.cost}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.clickSubmit}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}
const msp = (state) => ({
  clg: console.log("station state", state),
  location: state.location,
});

export default connect(msp, null)(Station);
