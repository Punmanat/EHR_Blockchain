const jwtDecode = require("jwt-decode");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    var decoded = jwtDecode(token);
    if (!decoded) {
      throw new Error("Please authenticate");
    }
    req.token = token;
    req.user = decoded;
    next();
  } catch (error) {
    console.log({error})
    res.status(401).send({ error: "Please authenticate" });
  }
};

// export module
module.exports = auth;
