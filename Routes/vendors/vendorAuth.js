const router = require("express").Router();
const Vendor = require("../../models/Vendor");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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

  try {
    const data = await Vendor.findOne({contact: req.body.contact});
    if(data !== null){
        res.status(409).json({
            status: "failure",
            message: "Vendor already exists"
        })
    }
    else{
    const savedVendor = await newVendor.save();
    res.status(201).json({
        status: "success",
        message: "Vendor created",
        savedVendor
    });
    console.log(savedVendor);
    }
} catch (err) {
    res.status(500).json({
        status: "failed",
        message: err.message});
}
});

router.post("/loginvendor", async (req, res) => {
  try {
    const { contact , password } = req.body
    const vendor = await Vendor.findOne({ contact: contact });
    if (vendor == null) {
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
      if (originalPassword == password) {
        const token = jwt.sign({ userId: vendor._id }, process.env.JWT_SEC);
        res.status(200).json({
          status: "success",
          message: "Login Successful",
          token: token,
          vendor: vendor,
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
      message: error.message,
    })
  }
});

module.exports = router;