const router = require("express").Router();
const User = require("../../models/User");

router.post("/registeruser", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
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
        const { contact, password } = req.body;

        const user = await User.findOne({ contact });
        if (user == null) {
            res.status(404).json({
                status: "failure",
                message: "User not found"
            })
        }
        else {
            if (password == user.password) {
                res.status(200).json({
                    status: "success",
                    message: "Login Successful",
                    user
                })
            }
            else {
                res.status(404).json({
                    status: "failure",
                    message: "Invalid Credentials"
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