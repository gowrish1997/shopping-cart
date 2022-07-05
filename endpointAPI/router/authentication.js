const jwt = require("jsonwebtoken");
const tokenvarification = (req, res, next) => {
  const authtoken = req.headers.token;
  if (authtoken) {
    const token = authtoken;
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(401).send("token is not valid");
      }
      
      req.user = user;
      next();
    });
  } else {
    return res.status(403).send("token authrntication failed");
  }
};
 module.exports = { tokenvarification };
