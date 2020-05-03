const jwt = require("jsonwebtoken");
const Client = require("../../models/clients");

const auth = async (req, res, next) => {
  const header = req.header("Authorization");
  if (header) {
    try {
      const token = header.replace("Bearer ", "");
      const data = jwt.verify(token, "Gilles", {
        issuer: "SitePsy_Dev",
      });

      req.userId = data._id;
      console.log(data._id);
      next();
    } catch (error) {
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
