import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./stationprofile.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getCS, updateCS } from "../fetchingData/api_calls";

class StationProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      open: "",
      close: "",
      cost: "",
      location: "",
      edit: true,
    };
  }

  componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    getCS(token).then((data) => {
      console.log(data);
      console.log(data[0].cs_closeat);
      this.setState((state) => ({
        phone: data[0].cs_phone,
        open: data[0].cs_openat,
        close: data[0].cs_closeat,
        cost: data[0].cs_cost,
        location: data[0].cs_latitude + "," + data[0].cs_longitude,
      }));
    });
  }

  handleChange = (name) => (event) => {
    this.setState((state) => ({ [name]: event.target.value }));
  };

  clickHandler = (e) => {
    this.setState({
      edit: !this.state.edit,
    });
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
    updateCS({ phone, open, close, long, lati, cost }, token).then((data) => {
      console.log(data);
      if (
        data.length == 16 ||
        data == "YOU CAN ONLY ADD ONE CHARGING STATION."
      ) {
        console.log(data);
        console.log("Error Updating");
      } else {
        this.setState({
          phone: phone,
          open: open,
          close: close,
          location: location,
          cost: cost,
        });
        console.log("Station added");
      }
    });
  };

  render() {
    const buttonText = this.state.edit ? (
      <Button variant="contained" color="primary">
        Edit your profile
      </Button>
    ) : (
      <Button variant="contained" color="primary">
        Back to profile
      </Button>
    );
    return (
      <div className="station__profile">
        <div className="station__profiles">
          <button onClick={this.clickHandler}>{buttonText}</button>

          {this.state.edit ? (
            <form className="station__container">
              <h3>Station Profile</h3>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  disabled="true"
                  placeholder={this.state.phone}
                />
              </div>

              <div className="form-group">
                <label>Working Hours</label>
                <input
                  type="number"
                  className="form-control"
                  disabled="true"
                  placeholder={this.state.open + " till " + this.state.close}
                />
              </div>

              <div className="form-group">
                <label>Charges per Hour (in Rs)</label>
                <input
                  type="number"
                  className="form-control"
                  disabled="true"
                  placeholder={this.state.cost}
                />
              </div>
            </form>
          ) : (
            <form>
              <h3>Edit your station profile</h3>
              <div className="form-group">
                <label>Location</label>
                <input
                  className="form-control"
                  placeholder="Location"
                  disabled="true"
                  value={this.props.location}
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
                  placeholder="Enter phone number for station (optional)"
                  onChange={this.handleChange("phone")}
                  value={this.state.phone}
                />
              </div>

              <div className="form-group">
                <label>Working Hours</label>

                <div>
                  From:

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
                  value={this.state.cost}
                  onChange={this.handleChange("cost")}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.clickSubmit}
              >
                Save changes
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const msp = (state) => ({
  location: state.location,
});

export default connect(msp, null)(StationProfile);
