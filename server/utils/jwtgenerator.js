const jwt = require("jsonwebtoken");
require("dotenv").config();


function jwtGenerator(user_id, user_role) {
    const payload = {
        user: user_id,
        role: user_role
    }

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "24hr" })
}
module.exports = jwtGenerator