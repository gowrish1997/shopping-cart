const router = require("express").Router();

const Cartmodel = require("../model/Cart");
const { tokenvarification } = require("./authentication");
router.post("/postcart/:id", function (req, res, next) {
  Cartmodel.find({ userId: req.params.id })
    .then((result) => {
      const cartproducts = result;
      if (cartproducts.length) {
        const sameidproduct = cartproducts[0].products.filter((item) => {
          return item.productId == req.body.products[0].productId;
        });
        if (
          sameidproduct.length &&
          sameidproduct[0].color == req.body.products[0].color &&
          sameidproduct[0].size == req.body.products[0].size
        ) {
          const sameidproductindex = cartproducts[0].products.findIndex(
            (item) => {
              return item.productId == req.body.products[0].productId;
            }
          );
          sameidproduct[0].quantity += req.body.products[0].quantity;
          cartproducts[0].products[sameidproductindex] = sameidproduct[0];

          Cartmodel.findOneAndUpdate(
            { userId: req.params.id },
            { $set: cartproducts[0] }
          )
            .then((result) => {
              res.send("iam repeated product so increased quantity by 1");
            })
            .catch((err) => {
              res.send(err.message);
            });
        } else {
          cartproducts[0].products.push(req.body.products[0]);
          Cartmodel.findOneAndUpdate(
            { userId: req.params.id },
            { $set: cartproducts[0] }
          )
            .then((result1) => {
              res.send("iam same user but different product");
            })
            .catch((err) => {
              res.send(err.message);
            });
        }
      } else {
        Cartmodel.create(req.body)
          .then((result) => {
            res.send("iam completely new user id");
          })
          .catch((err) => {
            res.send(err.message);
          });
      }
    })
    .catch((err) => {
      res.send(err.message);
    });

  // const password = req.body.password;
  // req.body.password = cryptojs.AES.encrypt(
  //   password,
  //   process.env.SECR_MESSAGE
  // ).toString();
  // if()
  //    Cartmodel.create(req.body).then((result)=>{
  //     res.send(result)
  //    }).catch((err)=>{
  //     console.log(err.message)
  //    })
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

router.put("/:id", (req, res) => {
  Cartmodel.find({ userId: req.params.id })
    .then((result) => {
      const cartproducts = result[0].products;

      const filter = cartproducts.filter((item) => {
        return item._id == req.body.productobjectid;
      });
      const productindex = cartproducts.findIndex((item) => {
        return (item._id = req.body.productobjectid);
      });
      filter[0].quantity += req.body.quantity;
      cartproducts[productindex] = filter[0];
      result[0].products = cartproducts;
      Cartmodel.findOneAndUpdate({ userId: req.params.id }, { $set: result[0] })
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err.message);
        });
    })
    .catch(() => {
      res.send("cant find the user");
    });
});

//   //                                      delete

router.put("/cartupdate/:id", (req, res) => {
  Cartmodel.find({ userId: req.params.id })
    .then((result) => {
      const cartproducts = result[0].products;

      const filter = cartproducts.filter((item) => {
        return item._id != req.body.productobjectid;
      });
      console.log(req.body);
      console.log(cartproducts[0]._id);
      result[0].products = filter;
      // if (cartproducts.length == 1) {
      //   Cartmodel.findOneAndDelete({userId:req.params.id}).then((resullt)=>{
      //     res.send(result)
      //   }).catch((err)=>{
      //     res.send(err.message)
      //   })
      // } 
        Cartmodel.findOneAndUpdate(
          { userId: req.params.id },
          { $set: result[0] }
        )
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            res.send(err.message);
          });
      
    })
    .catch((err) => {
      console.log("erroe");
      res.send(err.message);
    });
});

//    //get

router.get("/user/:id", (req, res) => {
  Cartmodel.find({ userId: req.params.id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

//   //       get all

router.get("/", tokenvarification, async (req, res) => {
  if (req.user.admin) {
    try {
      let newone = req.query.new;
      let qcategory = req.query.qcategory;
      let products;
      if (newone) {
        products = await Cartmodel.find().sort({ CreatedAt: -1 }).limit(4);
      } else if (qcategory) {
        products = await Cartmodel.find({ categories: { $in: qcategory } });
      } else {
        products = await Cartmodel.find();
      }
      res.status(200).send(products);
    } catch (err) {
      res.status(404).send(err.message);
    }
  } else {
    res.status(404).send("u are not authoried");
  }
});

module.exports = router;
