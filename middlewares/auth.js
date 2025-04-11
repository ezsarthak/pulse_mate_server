const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res) {
  const { token} = req.query;
  if (!token) return res.status(400).json({ "Invalid": "Invalid" });
  const user = getUser(token);
  if (!user) return res.status(400).json({ "Invalid": "Invalid" });
  res.status(200).json({ "jwtToken": token , "user":user});
}

async function restrictToLoggedinUserOnlyMiddleWare(req,res,next) {
  const {token }= req.query;
  if (!token) return res.status(400).json({ "Invalid": "Invalid" });
  const user = getUser(token);
  if (!user) return res.status(400).json({ "Invalid": "Invalid" });
  next();
}
module.exports = {
  restrictToLoggedinUserOnly,
  restrictToLoggedinUserOnlyMiddleWare
};
