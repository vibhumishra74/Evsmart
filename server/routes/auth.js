const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtgenerator");
const verifyInfo = require("../middleware/validInfo");
const { isAuth } = require("../middleware/isAuth");
const jwt = require("jsonwebtoken");
require("dotenv").config()

function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
};
function validPhone(phoneNo) {
    return /^[6-9]\d{9}$/.test(phoneNo);
};
// router.param("id",useridReturn);

//signup andd register
router.post("/signup", verifyInfo, async (req, res) => {
    try {
        const { firstname, lastname, phone, email, password } = req.body;//structing

        // check if user exsist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        // res.json(user.rows);
        // console.log(user.rows.length);
        if (user.rows.length << 0) {
            return res.status(401).json("USER ALREADY EXSIST");
        };
        //check if phone no. exsist
        const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1", [phone]);
        if (phone_no.rows.length << 0) {
            return res.status(401).json("Phone no. in use");
        };
        //bcrypting password
        const saltRound = 9;//no. of time to bcrypt password
        const Salt = bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, saltRound)//will ecrylic password 9 times
        // adding user to the database (storing database)
        const newUser = await pool.query("INSERT INTO users(user_firstname,user_lastname,user_phone, user_email, user_password) VALUES ($1,$2,$3,$4,$5) RETURNING user_firstname,user_lastname,user_phone, user_email", [firstname, lastname, phone, email, bcryptPassword]);
        // nr.token = JSON.stringify(token);
        res.json(newUser.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

//login route
router.post("/signin", verifyInfo, async (req, res) => {
    try {
        //structing
        const { email, password } = req.body;
        //check whether user exsist or not
        const user = await pool.query("SELECT * FROM users WHERE user_email =$1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("User doesnt exsist");
        };
        // checking password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        // console.log(user.rows[0])
        // console.log(validPassword)
        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        };
        //jwtoken
        // const token = jwtGenerator(user.rows[0].user_email);
        const token = jwtGenerator(user.rows[0].user_id, user.rows[0].user_role);
        res.cookie('t', token, { expire: new Date() + 1000000 });
        res.json({ token, user: user.rows[0].user_role });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})
//signout
router.get("/signout", async (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
})

router.get("/verify/:id", isAuth, async (req, res) => {
    try {
        res.json(true);
        // console.log(typeof(req.user.role))

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//getting the user data by token
router.get("/userdata/:id", isAuth, async (req, res) => {
    try {
        // console.log(req.user)
        userID = req.userID
        // check whether the user id is valid
        const id = await pool.query("SELECT * FROM users WHERE user_id = $1", [userID]);

        if (id.rows.length === 0) {
            return res.status(401).json("INVALID ID");
        };
        const userData = await pool.query("SELECT user_firstname,user_lastname,user_email,user_phone FROM users WHERE user_id = $1", [userID])
        res.json(userData.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
})

//updting the user data
router.put("/userdata/:id", verifyInfo, isAuth, async (req, res) => {
    try {
        // console.log(req.userID)
        const { firstname, lastname, email, phone } = req.body;
        if (![email, firstname, lastname, phone].every(Boolean)) {
            return res.status(401).json("missing Email password phone no. or name");
        };
        // check if user exsist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1 AND NOT user_id = $2", [email, req.userID]);
        if (user.rows.length << 0) {
            return res.status(401).json("USER ALREADY EXSIST");
        };
        //check if phone no. exsist
        const phone_no = await pool.query("SELECT * FROM users WHERE user_phone = $1 AND NOT user_id =$2", [phone, req.userID]);
        if (phone_no.rows.length << 0) {
            return res.status(401).json("Phone no. in use");
        } else if (!validPhone(phone)) {
            return res.status(401).json("Invalid Phone no.")
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        };
        // console.log(req.user)
        const updateUser = await pool.query("UPDATE users SET user_firstname=$1,user_lastname=$2,user_email=$4,user_phone=$3 WHERE user_id=$5 RETURNING user_firstname,user_lastname,user_email,user_phone", [firstname, lastname, phone, email, req.userID])
        // res.json(updateUser.rows)
        res.json(updateUser.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
})
//change password
router.put("/changePass/:id", verifyInfo, isAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (![currentPassword, newPassword].every(Boolean)) {
            return res.status(401).json("missing Email password phone no. or name");
        };
        // console.log(currentPassword)
        //check whether user exsist or not
        const user = await pool.query("SELECT * FROM users WHERE user_id =$1", [req.userID]);

        // checking current password
        const validPassword = await bcrypt.compare(currentPassword, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json("Current Password Entered is incorrect");
        };

        // check whether current is same a new Password
        const samePassword = await await bcrypt.compare(newPassword, user.rows[0].user_password);
        // console.log(samePassword);
        if (samePassword) {
            return res.status(401).json(" your new Password is same as Current password")
        };
        //bcrypting password
        const saltRound = 9;//no. of time to bcrypt password
        const Salt = bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(newPassword, saltRound)

        const updatePassword = await pool.query("UPDATE users SET user_password = $1 WHERE user_id=$2 RETURNING user_email", [bcryptPassword, req.userID])
        // res.json(updateUser.rows)
        res.json(updatePassword.rows)


    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
})


module.exports = router;