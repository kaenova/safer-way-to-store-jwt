import jwt from "jsonwebtoken";

const secret = "abc"

/*
  Function for request authorization using JWT validation on
  authorization headers or cookie headers.
*/
function JwtMiddleware(req, res, next) {
  try {
    // JWT on authorization header
    const authHeader = req.headers["authorization"];
    // JWT on cookies header
    const cookieHeader = req.cookies.token
    // If there's no JWT Header on authHeader or cookieHeader
    if (authHeader == undefined && cookieHeader == undefined) {
      return res.sendStatus(401);
    }

    let token
    if (authHeader != undefined) {
      token = authHeader.split(" ")[1];
    } else {
      token = req.cookies.token
    }
    // Verify valid token
    jwt.verify(token, secret, (err, payload) => {
      req.user = payload;
      next();
    });
  } catch (e) {
    res.sendStatus(401);
  }
}

/*
  Function for craeting 
*/
function CreateJWT() {
  // Dummy payload
  let payload = {
    name: "Kaenova",
    role: "cs",
  };
  // Sign JWT
  let token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token;
}

export {JwtMiddleware, CreateJWT}