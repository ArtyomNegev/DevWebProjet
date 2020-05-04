const Client = require("../../models").Clients;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Key = require("../constant/index");
module.exports = {
  login(req, res) {
    Client.findAll({
      where: {
        email: req.body.email,
      },
    }).then((users) => {
      if (users.length > 0) {
        if (bcrypt.compareSync(req.body.Mdp, users[0].password)) {
          const token = jwt.sign(
            {
              _id: users[0].userId,
            },
            "Gilles",
            {
              expiresIn: "1h",
              issuer: "SitePsy_Dev",
            }
          );
          console.log(token);
          res.setHeader("Authorization", "Bearer " + token);

		  var moderator = (users[0].userId == 0);

//          res.status(200).send("login succesful");

		  //  the boolean flag moderator is to help the user-interface
		 //  but  each REST call requiring moderator should be checked by inspecting JWT
          res.status(200).json({ "token" : token , "moderator" : moderator});

        } else {
          res.status(403).send("ça marche bof");
        }
      } else {
        res.status(403).send("ça marche po");
      }
    });
  },
  generateJWT(user) {
    const token = jwt.sign(
      {
        _id: user.userId,
      },
      Key
    );
    console.log(token);
  },
};
