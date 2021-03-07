import React, { Component } from "react";
import { getAllDash } from "../fetchingData/api_calls";
import "./profile.css";
import { JsonToTable } from "react-json-to-table";
import { Table } from "reactstrap";

class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }
  state1 = () => {
    this.setState({ users: this.state.users });
  };
  getdata() {
    setTimeout(() => {
      // this.setState({
      // users:
      // this.state.users.length == 0 ? this.state.users : "data loading..",
      // });
    }, 1000);
  }

  componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    if (this.state.users.length == 0) {
      getAllDash(token).then((data) => {
        // data.map((user_id, idx) => {
        return data.map((data, idx) => {
          // console.log("alldata", data);
          this.setState({
            // users: data,
            users: (
              <Table responsive key={data.user_id}>
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>user_id</th>
                    <th>user_firstname</th>
                    <th>user_lastname</th>
                    <th>user_phone</th>
                    <th>user_email</th>
                    <th> user_password</th>
                    <th>user_verification</th>
                    <th>cs_status </th>
                    <th>user_created_at </th>
                    <th>user_updated_at </th>
                    <th>user_role </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{data.user_id} </td>
                    <td>{data.user_firstname}</td>
                    <td>{data.user_lastname}</td>
                    <td>{data.user_phone}</td>
                    <td>{data.user_email}</td>
                    <td>{data.user_password}</td>
                    <td>{data.user_verification}</td>
                    <td>{data.cs_status}</td>
                    <td>{data.user_created_at}</td>
                    <td>{data.user_updated_at}</td>
                    <td>{data.user_role}</td>
                  </tr>
                </tbody>
              </Table>
            ),
          });
        });
      });
    }
  }

  data1 = async () => {
    // let d2 = this.state.users.map((data) => data);
    // console.log("data from state", d2);
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    if (this.state.users.length == 0) {
      await getAllDash(token).then((data) => {
        // data.map((user_id, idx) => {
        data.map(async (data, idx) => {
          // console.log("alldata", data);
          return await this.setState({
            // users: data,
            users: (
              <Table responsive key={data.user_id}>
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>user_id</th>
                    <th>user_firstname</th>
                    <th>user_lastname</th>
                    <th>user_phone</th>
                    <th>user_email</th>
                    <th> user_password</th>
                    <th>user_verification</th>
                    <th>cs_status </th>
                    <th>user_created_at </th>
                    <th>user_updated_at </th>
                    <th>user_role </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{data.user_id} </td>
                    <td>{data.user_firstname}</td>
                    <td>{data.user_lastname}</td>
                    <td>{data.user_phone}</td>
                    <td>{data.user_email}</td>
                    <td>{data.user_password}</td>
                    <td>{data.user_verification}</td>
                    <td>{data.cs_status}</td>
                    <td>{data.user_created_at}</td>
                    <td>{data.user_updated_at}</td>
                    <td>{data.user_role}</td>
                  </tr>
                </tbody>
              </Table>
            ),
          });
        });
      });
    }
  };

  render() {
    return (
      <div className="adminDash">
        {/* <JsonToTable json={this.state.users} /> */}
        {/* {("from render", console.log(this.state.users))} */}
        {/* {console.log("userrrr data", this.state.users)} */}
        {/* {this.state.users.length > 0
          ? this.state.users.map((data) => data)
          : "not rendered"} */}
        {this.data1}
        {this.getdata}

        {}
      </div>
    );
  }
}

export default AdminDash;
