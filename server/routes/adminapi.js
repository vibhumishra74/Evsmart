const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const verifyInfo = require("../middleware/validInfo");
const { isAuth, isAdmin } = require("../middleware/isAuth");
require("dotenv").config();
//function for regex
function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
};
function validPhone(phoneNo) {
    return /^[6-9]\d{9}$/.test(phoneNo);
};


//admin dashboard
router.get("/addUser/:id", isAuth, isAdmin, async (req, res) => {
    res.json("admin dashboard");
})
//admin create user
router.post("/addUser/:id", isAuth, isAdmin, verifyInfo, async (req, res) => {
    try {
        const { firstname, lastname, phone, email, password, verification, role } = req.body;//structing
        // check if user exsist
        if (![firstname, lastname, phone, email, role].every(Boolean)) {
            return res.status(401).json("missing Email password phone no. or name");
        }
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length << 0) {
            return res.status(401).json("USER ALREADY EXSIST");
        };
        //check if phone no. exsist
        const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1", [phone]);
        if (phone_no.rows.length << 0) {
            return res.status(401).json("Phone no. in use");
        } else if (!validPhone(phone)) {
            return res.status(401).json("Invalid Phone no.")
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        };


        //bcrypting password
        const saltRound = 9;//no. of time to bcrypt password
        const Salt = bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, saltRound)//will ecrylic password 9 times
        // adding user to the database (storing database)
        const newUser = await pool.query("INSERT INTO users(user_firstname,user_lastname,user_phone, user_email, user_password,user_verification,user_role) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", [firstname, lastname, phone, email, bcryptPassword, verification, role]);
        res.json(newUser.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

// admin view all users
router.get("/allUsers/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const allUser = await pool.query("SELECT * FROM users");
        res.json(allUser.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//Admin view of single user by user id
router.get("/getUser/:id", isAuth, isAdmin, async (req, res) => {
    try {
        let userID = req.query.userid;
        const id = await pool.query("SELECT * FROM users WHERE user_id = $1", [userID]);
        if (id.rows.length === 0) {
            return res.status(401).json("INVALID USER ID");
        };
        const userData = await pool.query("SELECT * FROM users WHERE user_id = $1", [userID])
        res.json(userData.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
})
// Admin can update users data individually
router.put("/updateUser/:id", isAuth, isAdmin, async (req, res) => {
    try {
        let userID = req.query.userid;
        const { firstname, lastname, phone, email, verification, role } = req.body;
        if (![firstname, lastname, phone, email, role].every(Boolean)) {
            return res.status(401).json("missing Email password phone no. or name");
        }
        const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1 AND NOT user_id =$2", [phone, userID]);
        if (phone_no.rows.length << 0) {
            return res.status(401).json("Phone no. in use");
        }
        //check if phone no. exsist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1 AND NOT user_id = $2", [email, userID]);
        if (user.rows.length << 0) {
            return res.status(401).json("USER ALREADY EXSIST");
        } else if (!validPhone(phone)) {
            return res.status(401).json("Invalid Phone no.")
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        };
        const updateUser = await pool.query("UPDATE users SET user_firstname=$1,user_lastname=$2,user_phone=$3,user_email=$4,user_verification=$5,user_role=$6 WHERE user_id=$7 RETURNING *", [firstname, lastname, phone, email, verification, role, userID]);
        res.json(updateUser.rows)


    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//Admin can Delete user
// router.delete("/deleteUser/:id", isAuth, isAdmin, async (req, res) => {
//     try {
//         let r = "admin";
//         let userID = req.query.userid;
//         const id = await pool.query("SELECT * FROM users WHERE user_id = $1", [userID]);
//         if (id.rows.length === 0) {
//             return res.status(401).json("INVALID USER ID");
//         };
//         const deleteUser = await pool.query("DELETE FROM users WHERE user_id =$1 AND NOT user_role= $2", [userID, r])
//         res.json("DELETED SUCESSFULLY");
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json("server error");
//     };
// });

// for user verification
router.get("/userVerification/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const email = req.query.emailid;
        // console.log(email)
        //check whether user exsist or not
        const user = await pool.query("SELECT * FROM users WHERE user_email =$1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("User doesnt exsist");
        };
        const verifyUpdate = await pool.query("UPDATE users SET user_verification = true WHERE user_email = $1 RETURNING user_email,user_verification", [email]);
        res.json(verifyUpdate.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});
//to change role between admin and user
router.put("/userRole/:id", isAuth, isAdmin, async (req, res) => {
    try {
        let userID = req.query.userid;
        let role = req.query.role;
        const userRole = await pool.query("UPDATE users SET user_role = $1 WHERE user_id =$2 AND NOT user_id=$3 RETURNING user_id,user_role", [role, userID, req.user.user]);
        res.json(userRole.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

module.exports = router;

// Admin can create charging station
router.post("/newcs/:id", isAuth, isAdmin, async (req, res) => {
    try {
        let userID = req.query.userid;
        const ocs = await pool.query("SELECT * FROM charging_station WHERE user_id =$1", [userID]);
        csStatus = ocs.rows;
        if (csStatus.length << 0) {
            return res.status(400).json("YOU CAN ONLY ADD ONE CHARGING STATION.");
        };
        const { phone, open, close, long, lati, cost, verification } = req.body;
        // check in charging station exist or not
        const chargingStation = await pool.query("SELECT * FROM charging_station WHERE cs_longitude = $1 AND cs_latitude =$2", [long, lati]);
        if (chargingStation.rows.length << 0) {
            return res.status(400).json("Charging Station Already Exist");
        };
        const newCS = await pool.query("INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,cs_verification,user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [phone, open, close, long, lati, cost, verification, userID]);
        const oc = await pool.query("UPDATE users SET cs_status = true WHERE user_id = $1 ", [userID])
        res.json(newCS.rows);
        console.log("created charging station");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

// admin can get cs by cs_id(uuid)
router.get("/csdata/:id", isAuth, isAdmin, async (req, res) => {
    try {
        let csID = req.query.csID;
        const cs = await pool.query("SELECT * FROM charging_station WHERE cs_id = $1", [csID]);
        res.json(cs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//admin can see all CS
router.get("/csall/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const getAllCS = await pool.query("SELECT * FROM charging_station");
        res.json(getAllCS.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//admin can update charging station
router.put("/csdata/:id", isAuth, isAdmin, async (req, res) => {
    try {
        let csID = req.query.csID;
        const { phone, open, close, long, lati, cost, verification } = req.body;
        // check in charging station exist or not
        const checkCS = await pool.query("SELECT * FROM charging_station WHERE cs_id = $1", [csID]);
        if (checkCS.rows.length === 0) {
            return res.status(400).json("Charging Station DOESNT Exist");
        };
        // check in charging station exist or not
        const chargingStation = await pool.query("SELECT * FROM charging_station WHERE cs_longitude = $1 AND cs_latitude =$2 AND NOT cs_id =$3 ", [long, lati, csID]);
        if (chargingStation.rows.length << 0) {
            return res.status(400).json("Charging Station Already Exist");
        };

        const updateCs = await pool.query("UPDATE charging_station SET cs_phone = $1 ,cs_openat = $2 , cs_closeat = $3 , cs_longitude = $4 , cs_latitude =$5 , cs_cost =$6 ,cs_verification = $7 WHERE cs_id = $8 RETURNING * ", [phone, open, close, long, lati, cost, verification, csID]);
        res.json(updateCs.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//admin can delete the cs by id
router.delete("/deletecs/:id", isAuth, isAdmin, async (req, res) => {
    try {
        let csID = req.query.csID;
        const deleteCS = await pool.query("DELETE FROM charging_station WHERE cs_id =$1 RETURNING user_id", [csID]);
        console.log(deleteCS.rows[0].user_id);
        const csstatus = await pool.query("UPDATE users SET cs_status = false WHERE user_id = $1 ", [deleteCS.rows[0].user_id])
        res.json("DELETED SUCCESSFULLY")

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//verifying charging station
router.get("/verifycs/:id", isAuth, isAdmin, async (req, res) => {
    try {
        let csID = req.query.csID;
        //check whether CS exsist or not
        const csExist = await pool.query("SELECT * FROM charging_station WHERE cs_id =$1", [csID]);
        if (csExist.rows.length === 0) {
            return res.status(401).json("CHARGIND STATION DOESNT EXSIST or invalid input");
        };
        const csVerify = await pool.query("UPDATE charging_station SET cs_verification = true WHERE cs_id = $1 RETURNING cs_id,cs_verification", [csID]);
        res.json(csVerify.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});