const jwt = require("jsonwebtoken");
const issuerProj = "SitePsy_Dev";

module.exports = {
 createJWT(userId, passwordJWT, duration) {
	// return JWT
	
	const token = jwt.sign(
            {
              _id: userId,
            },
            passwordJWT,
            {
              expiresIn: duration,   // to test  "1m"
              issuer: issuerProj,
            })

	// console.log('created token',token)
	return token
},

 validateJWT(header, passwordJWT) {
	// return userId if valid
	const token = header.replace("Bearer ", "");
	
	try {
	const data = jwt.verify(token, passwordJWT, {
        issuer: issuerProj,
      });
	
	return data._id
	} catch (error) {
		return null
	}
  }
}