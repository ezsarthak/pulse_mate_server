const express = require("express");
const { handleDatingData,handleFilterUser , handleUserFriends} = require("../controllers/user");

const staticRouter = express.Router();

staticRouter.get("/data", handleDatingData);
staticRouter.get("/filter-users", handleFilterUser);
staticRouter.get("/friends", handleUserFriends);

module.exports = staticRouter;
