const router = require("express").Router();
const pool = require("../db");
const { isAuth, csIDReturn } = require("../middleware/isAuth");

router.get("/g/:id", csIDReturn, (req, res) => {
    res.json(req.csid)
    // res.json(req.user)
})
// create charging station
router.post("/newcs/:id", isAuth, async (req, res) => {
    try {
        const ocs = await pool.query("SELECT * FROM charging_station WHERE user_id =$1", [req.userID]);
        csStatus = ocs.rows;
        if (csStatus.length << 0) {
            return res.status(400).json("YOU CAN ONLY ADD ONE CHARGING STATION.");
        };
        const { phone, open, close, long, lati, cost } = req.body;
        // check in charging station exist or not
        const chargingStation = await pool.query("SELECT * FROM charging_station WHERE cs_longitude = $1 AND cs_latitude =$2", [long, lati]);
        if (chargingStation.rows.length << 0) {
            return res.status(400).json("Charging Station Already Exist");
        };
        // console.log(req.user)
        // inserting in database    
        const newCS = await pool.query("INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,user_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING cs_id,cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost", [phone, open, close, long, lati, cost, req.userID]);
        const oc = await pool.query("UPDATE users SET cs_status = true WHERE user_id = $1 ", [req.userID])
        res.json(newCS.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

// to get charging station id=(uuid)
router.get("/cs_id/:id", isAuth, async (req, res) => {
    try {//check whether CS exsist or not
        const csExist = await pool.query("SELECT * FROM charging_station WHERE user_ID =$1", [req.userID]);
        if (csExist.rows.length === 0) {
            return res.status(401).json("YOU HAVE NO CHARGING STATION ADDED");
        };
        const csID = await pool.query("SELECT cs_id FROM charging_station WHERE user_id =$1", [req.userID]);
        res.json(csID.rows[0].cs_id);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});



// get all charging station data
router.get("/csall", async (req, res) => {
    try {
        const getAllCS = await pool.query("SELECT cs_id,cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost FROM charging_station");
        res.json(getAllCS.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

// get data of charging station added by said cs id 
router.get("/csdata/:id", csIDReturn, async (req, res) => {
    try {
        const cs = await pool.query("SELECT cs_id,cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost FROM charging_station WHERE cs_id = $1", [req.csid]);
        // console.log(cs.rows);
        res.json(cs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

// update charging station
router.put("/csdata/:id", csIDReturn, async (req, res) => {
    try {
        const { phone, open, close, long, lati, cost } = req.body;
        // check in charging station exist or not
        const checkCS = await pool.query("SELECT * FROM charging_station WHERE cs_id = $1", [req.csid]);
        if (checkCS.rows.length === 0) {
            return res.status(400).json("Charging Station DOESNT Exist");
        };
        // check in charging station exist or not
        const chargingStation = await pool.query("SELECT cs_id,cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost FROM charging_station WHERE cs_longitude = $1 AND cs_latitude =$2 AND NOT cs_id =$3 ", [long, lati, req.csid]);
        if (chargingStation.rows.length << 0) {
            return res.status(400).json("Charging Station Already Exist");
        };

        const updateCs = await pool.query("UPDATE charging_station SET cs_phone = $1 ,cs_openat = $2 , cs_closeat = $3 , cs_longitude = $4 , cs_latitude =$5 , cs_cost =$6 WHERE cs_id = $7 RETURNING cs_id,cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost ", [phone, open, close, long, lati, cost, req.csid]);
        res.json(updateCs.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});

//delete the cs by id
router.delete("/deletecs/:id", csIDReturn, async (req, res) => {
    try {
        const deleteCS = await pool.query("DELETE FROM charging_station WHERE cs_id =$1 RETURNING user_id", [req.csid]);
        res.json("DELETED SUCCESSFULLY")
        const csstatus = await pool.query("UPDATE users SET cs_status = false WHERE user_id = $1 ", [deleteCS.rows[0].user_id])
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    };
});
module.exports = router;