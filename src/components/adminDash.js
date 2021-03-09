// import React, { Component } from "react";
// import { getAllDash } from "../fetchingData/api_calls";
// import "./profile.css";
// import { Table } from "reactstrap";

// class AdminDash extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       users: [],
//     };
//   }

//   componentDidMount() {
//     const token = localStorage
//       .getItem("jwt", JSON.stringify())
//       .replaceAll('"', "");
//       getAllDash(token).then((data) => {
//         data.map((user_id, idx) => {
//           this.setState({
//             users: data
//           });
//         });
//       });

//   }

//   renderTableData() {
//     return this.state.users.map((data, index) => {
//        const { user_id, user_firstname, user_lastname, user_phone, user_email, user_role, user_verification,
//       cs_status  } = data //destructuring
//        return (
//           <tr key={user_id}>
//             <td>{user_id}</td>
//              <td>{user_firstname}</td>
//              <td>{user_lastname}</td>
//              <td>{user_email}</td>
//              <td>{user_role}</td>
//              <td>{user_phone}</td>
//              <td>{user_verification}</td>
//              <td>{cs_status}</td>
//              <td><button>edit</button></td>
//           </tr>
//        )
//     })
//  }

//   render() {
//     return (
//       <div className="adminDash">
//         <Table>
//             <thead>
//                 <tr>
//                     <th>User Id</th>
//                     <th>User First Name</th>
//                     <th>User Last Name</th>
//                     <th>User Email</th>
//                     <th>User Role</th>
//                     <th>User Phone</th>
//                 </tr>
//                 </thead>
//                <tbody>
//                   {this.renderTableData()}
//                </tbody>
//             </Table>
//       </div>
//     );
//   }
// }

// export default AdminDash;

import React, { useEffect, useState } from "react";
import { getAllDash } from "../fetchingData/api_calls";
import { Table } from "reactstrap";

function AdminDash() {
  const [data, setData] = useState([]);

  // const fetchInventory = () => {
  //     fetch(`${INVENTORY_API_URL}`)
  //         .then(res => res.json())
  //         .then(json => setData(json));
  // }

  useEffect(() => {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    getAllDash(token).then((data) => {
      data.map((user_id, idx) => {
        setData(data);
      });
    });
  }, []);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [verification, setVerification] = useState(null);

  /**
   *
   * @param id - The id of the product
   * @param currentUnitPrice - The current unit price of the product
   */
  const onEdit = ({
    user_id,
    firstname,
    lastname,
    phone,
    email,
    role,
    verification,
  }) => {
    setInEditMode({
      status: true,
      rowKey: user_id,
    });
    setFirstname(firstname);
    setLastname(lastname);
    setPhone(phone);
    setEmail(email);
    setRole(role);
    setVerification(verification);
  };

  // const updateInventory = ({id, newUnitPrice}) => {
  //     fetch(`${INVENTORY_API_URL}/${id}`, {
  //         method: "PATCH",
  //         body: JSON.stringify({
  //             unit_price: newUnitPrice
  //         }),
  //         headers: {
  //             "Content-type": "application/json; charset=UTF-8"
  //         }
  //     })
  //         .then(response => response.json())
  //         .then(json => {
  //             // reset inEditMode and unit price state values
  //             onCancel();

  //             // fetch the updated data
  //             fetchInventory();
  //         })
  // }

  const updateUserAd;
  min = (token) => {
    return fetch(`${API}/admin/updateUser/${token}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   *
   * @param id -The id of the product
   * @param newUnitPrice - The new unit price of the product
   */
  // const onSave = ({id, newUnitPrice}) => {
  //     updateInventory({id, newUnitPrice});
  // }

  // const onCancel = () => {
  //     // reset the inEditMode state value
  //     setInEditMode({
  //         status: false,
  //         rowKey: null
  //     })
  //     // reset the unit price state value
  //     setUnitPrice(null);
  // }

  return (
    <div className="container">
      <h1>User Data</h1>
      <Table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>User First Name</th>
            <th>User Last Name</th>
            <th>User Email</th>
            <th>User Role</th>
            <th>User Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.user_id}>
              <td>{data.user_id}</td>
              <td>{data.user_firstname}</td>
              <td>{data.user_lastname}</td>
              <td>{data.user_email}</td>
              <td>{data.user_role}</td>
              <td>{data.user_phone}</td>
              {/* <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={unitPrice}
                                               onChange={(event) => setUnitPrice(event.target.value)}
                                        />
                                    ) : (
                                        item.unit_price
                                    )
                                }
                            </td> */}
              {/* <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <React.Fragment>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave({id: item.id, newUnitPrice: unitPrice})}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={() => onCancel()}
                                            >
                                                Cancel
                                            </button>
                                        </React.Fragment>
                                    ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({id: item.id, currentUnitPrice: item.unit_price})}
                                        >
                                            Edit
                                        </button>
                                    )
                                }
                            </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminDash;
