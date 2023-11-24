const express = require("express");
const { createGroupCtrl,
        fetchAllGroupsCtrl,
        fetchGroupCtrl,
        addMemberCtrl,
        updateMemberAsModeratorCtrl,
        updateMemberAsAdminCtrl } = require("../../controllers/group/groupCtrl.js");
const authMiddleware = require("../../middleware/auth/authMiddleware.js");

const groupRoute = express.Router();

groupRoute.post("/create",authMiddleware ,createGroupCtrl);
groupRoute.get("/",fetchAllGroupsCtrl);
groupRoute.get("/:id",fetchGroupCtrl);
groupRoute.put("/add",addMemberCtrl);
groupRoute.put("/update/moderator",updateMemberAsModeratorCtrl);
groupRoute.put("/update/admin",updateMemberAsAdminCtrl);

module.exports = groupRoute;