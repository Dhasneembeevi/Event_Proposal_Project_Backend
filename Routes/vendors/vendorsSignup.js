const router = require("express").Router();
const Vendor = require("../../models/Vendor");

router.post("/registervendor", async (req, res) => {
    const newVendor = new Vendor({
      username: req.body.username,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      });
    
      try {
        const savedVendor = await newVendor.save();
        res.status(201).json(savedVendor);
      } catch (err) {
        res.status(500).json(err);
      }
    })

      module.exports = router;










// router.post("/vendorsignup", async (req, res) => {
//   const newVendor = new Vendor({
//     username: req.body.username,
//     email: req.body.email,
//     contact: req.body.contact,
//     password: req.body.password,
//     confirmPassword: req.body.confirmPassword,
//   });
//   if (error) {
//     res.json({ message: error.message });

//   } else {
//     try {
//       const savedVendor = await Vendor.create({
//         username: username,
//         email: email,
//         contact: contact,
//         password: password,
//         confirmPassword: confirmPassword,
//       });
//       console.log("data added");
//       res.status(200).json({ message: "created successfully", savedVendor });
//     } catch (error) {
//       res.status(500).json({ message: error });
//     }
//   }
// });
// module.exports = router;
// /*
// lh:5000/api/auth/vendorsignup

    
//        if(!username ||!password ||!email ||!contact ||!confirmpassword){
//          res.status(401).json({message:"Please fill all the fields"})
         
//     }else{
//         try{
//             const savedVendor = await Signup.create({
//                 username : username , 
//                 password : password ,
//                 email:email, 
//                 contact:contact,
//                 confirmpassword : confirmpassword

//         })
//     }catch(err)=>{

//         }
//  } 
// })
// */
