const router = require("express").Router();
const pool =require("../db");
const {isAuth,isAdmin} = require("../middleware/isAuth");


router.get("/",isAuth,async (req,res)=>{
    try {
        // res.json(req.user); 
        const user = await pool.query("SELECT user_firstname FROM users WHERE user_id = $1",[req.user]);
        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

module.exports = router;
