const jwt = require("jsonwebtoken");
const Client = require("../../models/clients");
const tokenLib = require("../middleware/token");
// const JWTKEY = require("../constant/index");
const JWTKEY = "DoesNotWorkWith_constant!!!";


const auth = async (req, res, next) => {
  const header = req.header("Authorization");
  if (header) {
/*    try {
      const token = header.replace("Bearer ", "");
      const data = jwt.verify(token, "Gilles", {
        issuer: "SitePsy_Dev",
      });

      req.userId = data._id;
      console.log(data._id);
      next();
    } catch (error) {
	  console.log("401 error verify token")
      res.status(401).send({ code:"BAD_TOKEN", error: "Not authorized to access this resource" });
    }
*/
    const userId = tokenLib.validateJWT(header, JWTKEY);
	if (userId === null) {
      res.status(401).send({ code:"BAD_TOKEN", error: "Not authorized to access this resource" });
	} else {
	  req.userId = userId;
      next();		
	}

  } else {
    console.log("401 no token")
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};


const auth0 = async (req, res, next) => {
  const header = req.header("Authorization");
  if (header) 
  {
/*    try {
      const token = header.replace("Bearer ", "");
      const data = jwt.verify(token, "Gilles", {
        issuer: "SitePsy_Dev",
      });

	  if (data._id !== 0)
	  {
		console.log("401 bad token for such request")
    	res.status(401).send({ code:"BAD_TOKEN_FOR_SUCH_REQUEST",error: "Not authorized to access this resource" });
		}
	  else {
	      req.userId = data._id;
//	      console.log(data._id);
	      next();
      }
    } catch (error) {
	  console.log("401 error verify token")
      res.status(401).send({ code:"BAD_TOKEN", error: "Not authorized to access this resource" });
    }
*/
	const userId = tokenLib.validateJWT(header, JWTKEY);
	if (userId === null) {
      res.status(401).send({ code:"BAD_TOKEN", error: "Not authorized to access this resource" });
	} 
	else if (userId !== 0)
	{
		console.log("401 bad token for such request")
    	res.status(401).send({ code:"BAD_TOKEN_FOR_SUCH_REQUEST",error: "Not authorized to access this resource" });
	}
	else
	{
	  req.userId = userId;
      next();		
	}
  } else {
    console.log("401 no token")
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};


module.exports = {auth, auth0 };
