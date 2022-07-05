const router = require("express").Router();
const Usermodule = require("../model/User");
const cryptojs = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { tokenvarification } = require("./authentication");

dotenv.config();

//                              register

router.post("/register", function (req, res, next) {
  const password = req.body.password;
  // req.body.password = cryptojs.AES.encrypt(
  //   password,
  //   process.env.SECR_MESSAGE
  // ).toString();

  Usermodule.create(req.body)
    .then(function (result) {
      res.status(201).send(result);
    })
    .catch(function (err) {
      res.send(err.message);
    });
});

//                                 login

router.post("/login", function (req, res, next) {
  Usermodule.findOne({ username: req.body.username }).then((result) => {
    !result && res.status(404).send("incorrect credentials");

    // const originalpassword = cryptojs.AES.decrypt(
    //   result.password,
    //   process.env.SECR_MESSAGE
    // ).toString();

    result.password !== req.body.password &&
      res.status(404).send("password is wrong");
    const accestoken = jwt.sign(
      {
        id: result._id,
        admin: result.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3h",
      }
    );
    const { password, ...others } = result._doc;
    res.status(201).send({ ...others, accestoken });
  });
});

//                                            update

router.put("/:id", tokenvarification, (req, res) => {
  if (req.params.id == req.user.id || req.user.admin) {
    Usermodule.findByIdAndUpdate(req.params.id, req.body).then(function (
      result
    ) {
      res.send(result);
    });
  } else {
    res.status(402).send("not authorised to change");
  }
});

//                                      delete

router.delete("/:id", tokenvarification, (req, res) => {
  if (req.params.id == req.user.id || req.user.admin) {
    Usermodule.findByIdAndDelete(req.params.id).then(function (
      result
    ) {
      res.send(result);
    });
  } else {
    res.status(402).send("not authorised to delete ");
  }
});

 //get

router.get("/find/:id",tokenvarification,(req,res)=>{
  if ( req.user.admin) {
    Usermodule.findById(req.params.id).then((result)=>{

      const {password,...others}=result._doc
      res.status(200).send(others)
    }).catch(err=>{
      res.status(404).send(err.message)
    })}
    else{
      res.status(400).send("you are not admin")
    }
});

//       get all

router.get("/",tokenvarification,(req,res)=>{
  if ( req.user.admin) {
    Usermodule.find({}).then((result)=>{

      
      res.status(200).send(result)
    }).catch(err=>{
      res.status(404).send(err.message)
    })}
    else{
      res.status(400).send("you are not admin")
    }
});



module.exports = router;
