const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtgenerator");
const verifyInfo = require("../middleware/validInfo");
const { isAuth } = require("../middleware/isAuth");
const jwt = require("jsonwebtoken");
const { route } = require("./auth");
require("dotenv").config()

// Add review for cs
router.post("/addReview/:id", isAuth, async (req, res) => {
    try {let csID = req.query.csid;
        const { star, comment} = req.body;
        if (![star, comment].every(Boolean)) {
            return res.status(401).json("missing input field");
        };
        const cs = await pool.query("SELECT * FROM charging_station WHERE cs_id =$1", [csID]);
        if (cs.rows.length === 0) {
            return res.status(401).json("CHARGING STATION doesn't exsist");
        };
        const oneReview = await pool.query("SELECT * FROM review WHERE user_id = $1 AND cs_id = $2", [req.userID, csID]);
        if (oneReview.rows.length << 0) {
            return res.status(401).json("You can only add One review to this charging station");
        }
        const reviewAdd = await pool.query("INSERT INTO review (review_star,review_comment,cs_id,user_id) VALUES ($1,$2,$3,$4) RETURNING *", [star, comment, csID, req.userID]);
        res.json(reviewAdd.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//read individual review
router.get("/getReview/:id", isAuth, async (req, res) => {
    try {
        let csID = req.query.csid;
        const cs = await pool.query("SELECT * FROM charging_station WHERE cs_id =$1", [csID]);
        if (cs.rows.length === 0) {
            return res.status(401).json("CHARGING STATION doesn't exsist");
        };
        const csRewiew = await pool.query("SELECT * FROM review WHERE cs_id = $1 AND user_id =$2", [csID, req.userID]);
        res.json(csRewiew.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//Update review
router.put("/updateReview/:id", isAuth, async (req, res) => {
    try {
        let csID = req.query.csid;
        const { star, comment } = req.body;
        const cs = await pool.query("SELECT * FROM charging_station WHERE cs_id =$1", [csID]);
        if (cs.rows.length === 0) {
            return res.status(401).json("CHARGING STATION doesn't exsist");
        };
        const updateReview = await pool.query("UPDATE review SET review_star=$1,review_comment=$2 WHERE user_id=$3 AND cs_id=$4 RETURNING *", [star, comment, req.userID, csID]);
        res.json(updateReview.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//get all review per cs
router.get("/getCsReview", async (req, res) => {
    try {
        let csID = req.query.csid;
        const cs = await pool.query("SELECT * FROM charging_station WHERE cs_id =$1", [csID]);
        if (cs.rows.length === 0) {
            return res.status(401).json("CHARGING STATION doesn't exsist");
        };
        const csget = await pool.query("SELECT * FROM review WHERE cs_id=$1", [csID]);
        res.json(csget.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//DELETE Review
router.delete("/deleteReview/:id", isAuth, async (req, res) => {
    try {
        let csID = req.query.csid;
        const cs = await pool.query("SELECT * FROM charging_station WHERE cs_id =$1", [csID]);
        if (cs.rows.length === 0) {
            return res.status(401).json("CHARGING STATION doesn't exsist");
        };
        const deleteReview = await pool.query("DELETE FROM review WHERE cs_id=$1 AND user_id=$2", [csID, req.userID]);
        res.json("DELETED SUCESSFULLY");

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});
module.exports = router;