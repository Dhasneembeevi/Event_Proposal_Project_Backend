const router = require("express").Router();
const User = require("../../models/User");
const CryptoJS = require("crypto-js");

router.post("/registeruser", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY).toString(),
        confirmPassword: CryptoJS.AES.encrypt(
            req.body.confirmPassword,
            process.env.SECRET_KEY).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post("/loginuser", async (req, res) => {
    try {
       
        const user = await User.findOne({ contact: req.body.contact });
        if (!user) {
            res.status(404).json({
                status: "failure",
                message: "User not found"
            })
        }
        else {
            console.log(user)
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.SECRET_KEY);

            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);    
            if (originalPassword == req.body.password) {
                res.status(200).json({
                    status: "success",
                    message: "Login Successful",
                    user
                })
            }
            else {
                res.status(404).json({
                    status: "failure2",
                    message: "Invalid Password"
                })
            }
        }
    }
    catch (error) {
            res.status(500).json({
                status: "failure",
                message: "Internal Server Error"
            })
        }
    })

module.exports = router;