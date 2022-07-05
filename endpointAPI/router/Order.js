const router = require("express").Router();

const Ordermodel = require("../model/Order");
const { tokenvarification } = require("./authentication");
router.post("/postOrder/:id", function (req, res, next) {
  Ordermodel.find({ userId: req.params.id })
    .then((result) => {
      const Orderproducts = result;
      if (Orderproducts.length) {
        console.log(req.body.products)
        Orderproducts[0].products=[...Orderproducts[0].products,...req.body.products]
        Ordermodel.findOneAndUpdate(
          { userId: req.params.id },
          { $set: Orderproducts[0] }
        )
          .then((result1) => {
            res.send("iam same user but different product");
          })
          .catch((err) => {
            res.send(err.message);
          });
      } else {
        console.log(req.body.products)
        Ordermodel.create(req.body)
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

 
});

router.get("/Orderget/:id", (req, res) => {
  Ordermodel.find({ userId: req.params.id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

module.exports = router;