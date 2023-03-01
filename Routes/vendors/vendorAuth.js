const router = require("express").Router();
const Vendor = require("../../models/Vendor");
const CryptoJS = require("crypto-js");

router.post("/registervendor", async (req, res) => {
  const newVendor = new Vendor({
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
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post("/loginvendor", async (req, res) => {
  try {

    const vendor = await Vendor.findOne({ contact: req.body.contact });
    if (!vendor) {
      res.status(404).json({
        status: "failure",
        message: "Vendor not found"
      })
    }
    else {
      const hashedPassword = CryptoJS.AES.decrypt(
        vendor.password,
        process.env.SECRET_KEY);

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (originalPassword == req.body.password) {
        res.status(200).json({
          status: "success",
          message: "Login Successful",
          vendor
        })
      }
      else {
        res.status(404).json({
          status: "failure",
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

