const router = require("express").Router();
const User = require("../../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/registeruser", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    confirmPassword: CryptoJS.AES.encrypt(req.body.confirmPassword, process.env.SECRET_KEY).toString(),
  });

  try {
    const data = await User.findOne({ contact: req.body.contact });
    if (data !== null) {
      res.status(409).json({
        status: "failure",
        message: "User already exists",
      });
    } else {
      const savedUser = await newUser.save();
      res.status(201).json({
        status: "success",
        message: "User created",
        savedUser,
      });
      console.log(savedUser);
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.post("/loginuser", async (req, res) => {
  try {
    const { contact, password } = req.body;
    const user = await User.findOne({ contact: contact });
    if (user == null) {
      res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (originalPassword == password) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SEC);
        res.status(200).json({
          status: "success",
          message: "Login successful",
          token: token,
          user: user,
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "Invalid password",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
});

module.exports = router;


// const router = require("express").Router();
// const User = require("../../models/User");
// const CryptoJS = require("crypto-js");

// router.post("/registeruser", async (req, res) => {
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         contact: req.body.contact,
//         password: CryptoJS.AES.encrypt(
//             req.body.password,
//             process.env.SECRET_KEY).toString(),
//         confirmPassword: CryptoJS.AES.encrypt(
//             req.body.confirmPassword,
//             process.env.SECRET_KEY).toString(),
//     });

//     try {
//         const data = await User.findOne({contact: req.body.contact});
//         if(data !== null){
//             res.status(409).json({
//                 status: "failure",
//                 message: "User already exists"
//             })
//         }
//         else{
//         const savedUser = await newUser.save();
//         res.status(201).json({
//             status: "success",
//             message: "User created",
//             savedUser
//         });
//         console.log(savedUser);
//         }
//     } catch (err) {
//         res.status(500).json({
//             status: "failed",
//             message: err.message});
//     }
// })


// router.post("/loginuser", async (req, res) => {
//     try {
//       const { contact , password } = req.body
//       const user = await User.findOne({ contact: contact });
//       if (user == null) {
//         res.status(404).json({
//           status: "failure",
//           message: "user not found"
//         })
//       }
//       else {
//         const hashedPassword = CryptoJS.AES.decrypt(
//           user.password,
//           process.env.SECRET_KEY);
  
//         const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//         if (originalPassword == password) {
//           res.status(200).json({
//             status: "success",
//             message: "Login Successful",
//             user
//           })
//         }
//         else {
//           res.status(404).json({
//             status: "failure2",
//             message: "Invalid Password"
//           })
//         }
//       }
//     }
//     catch (error) {
//       res.status(500).json({
//         status: "failure",
//         message: error.message
//       })
//     }
//   })

// module.exports = router;



