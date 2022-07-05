const router = require("express").Router();
const Productmodel = require("../model/Product");
const { tokenvarification } = require("./authentication");
router.post("/postproducts",tokenvarification, function (req, res, next) {
  const password = req.body.password;
  // req.body.password = cryptojs.AES.encrypt(
  //   password,
  //   process.env.SECR_MESSAGE
  // ).toString();
  if (req.user.admin) {
  Productmodel.create(req.body)
    .then(function (result) {
      res.status(201).send(result);
    })
    .catch(function (err) {
      res.send(err.message);
    });
  }
  else{
    res.status(402).send("not authorised to change");
  }
});

//                                 login

//   router.post("/login", function (req, res, next) {
//     Usermodule.findOne({ username: req.body.username }).then((result) => {
//       !result && res.status(404).send("incorrect credentials");

//       // const originalpassword = cryptojs.AES.decrypt(
//       //   result.password,
//       //   process.env.SECR_MESSAGE
//       // ).toString();

//       result.password !== req.body.password &&
//         res.status(404).send("password is wrong");
//       const accestoken = jwt.sign(
//         {
//           id: result._id,
//           admin: result.isAdmin,
//         },
//         process.env.JWT_SEC,
//         {
//           expiresIn: "3d",
//         }
//       );
//       const { password, ...others } = result._doc;
//       res.status(201).send({ ...others, accestoken });
//     });
//   });

//   //                                            update

router.put("/:id", tokenvarification, (req, res) => {
  if (req.user.admin) {
    Productmodel.findByIdAndUpdate(req.params.id, { $set: req.body }).then(
      function (result) {
        res.send(result);
      }
    );
  } else {
    res.status(402).send("not authorised to change");
  }
});

//   //                                      delete

  router.delete("/:id", tokenvarification, (req, res) => {
    if ( req.user.admin) {
      Productmodel.findByIdAndDelete(req.params.id).then(function (
        result
      ) {
        res.send(result);
      });
    } else {
      res.status(402).send("not authorised to delete ");
    }
  });

//    //get

  router.get("/find/:id",(req,res)=>{
 
    Productmodel.findById(req.params.id).then((result)=>{

        const {password,...others}=result._doc
        res.status(200).send(others)
      }).catch(err=>{
        res.status(404).send(err.message)
      })
    
  });

//   //       get all

router.get("/", async (req, res) => {

    try{
      let newone=req.query.new;
      let qcategory=req.query.qcategory
      let products
      if(newone){
      products=await Productmodel.find().sort({CreatedAt:-1}).limit(4)
            }
            else if(qcategory){
              products=await Productmodel.find({categories:{$in:[qcategory]}})
  
            }
            else{
              products=await Productmodel.find();
            }
   res.status(200).send(products);

  }

  catch(err) {
    res.status(404).send(err.message);
  }

  

   
});

module.exports = router;
