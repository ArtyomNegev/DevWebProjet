const assert = require('assert').strict;
const tokenLib = require("../server/middleware/token");


describe('The token module', function () 
	{
	  it('can encode and decode symetrically', function () 
		{
			
			const passwordJWT = 'UnitTest';
			const userId = 22;
			
			var token = tokenLib.createJWT(userId, passwordJWT, "1h");
			// console.log('token',token);
			
			var decryptedUserId = tokenLib.validateJWT(token, passwordJWT);
			// console.log('decryptedUserId',decryptedUserId);
			
			assert(decryptedUserId!==null, 'valid decryption');
			assert.equal(decryptedUserId, userId, 'return same data after encrypt/decrypt');
		})
	}
)

describe('The token module', function () 
	 {
	  it('refuses tokens with another password ', function () 
		{
			
			const passwordJWT = 'UnitTest';
			const userId = 22;
			
			var token = tokenLib.createJWT(userId, passwordJWT, "1h");
			// console.log('token',token);
			
			var decryptedUserId = tokenLib.validateJWT(token, passwordJWT+'ohoh');
			// console.log('decryptedUserId',decryptedUserId);
			
			assert(decryptedUserId===null, 'we expect to receive null for the result of validation');
		})
	}	
)
