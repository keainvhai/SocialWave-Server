const { verify } = require("jsonwebtoken");

//grab token(sent through front end),using jwt method(verify) to validate,then send comment

//this function will run before request
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "User not logged in!" });
  } else {
    try {
      const validToken = verify(accessToken, "importantscrect");
      req.user = validToken;
      if (validToken) {
        return next();
      }
    } catch (error) {
      return res.json({ error: err });
    }
  }
};

module.exports = { validateToken };
