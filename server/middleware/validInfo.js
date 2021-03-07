module.exports = function (req, res, next) {
    // console.log("hi verify")
    const { email, firstname, lastname, phone, password } = req.body;
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    };
    function validPhone(phoneNo) {
        return /^[6-9]\d{9}$/.test(phoneNo);
    };
    // console.log(req.path)
    if (req.path === "/signup") {
        // console.log(!email.length);
        if (![email, firstname, lastname, phone, password].every(Boolean)) {
            return res.status(401).json("missing Email password phone no. or name");
        } else if (!validPhone(phone)) {
            return res.status(401).json("Invalid Phone no.")
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        };
    } else if (req.path === "/signin") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Please Enter email and password");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        };
    }
    next();
};
