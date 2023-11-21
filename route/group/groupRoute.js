const express = require("express");
const { createGroupCtrl,
        fetchAllGroupsCtrl,
        fetchGroupCtrl,
        addMemberCtrl,
        updateMemberAsModeratorCtrl,
        updateMemberAsAdminCtrl,
        removeMemberCtrl,
        deleteGroupCtrl } = require("../../controllers/group/groupCtrl.js");
const authMiddleware = require("../../middleware/auth/authMiddleware.js");
const { adminAuth,
        adminAndModeratorAuth,
        memberAuth } = require("../../middleware/auth/groupUserAuthMiddleware.js");

const groupRoute = express.Router();

groupRoute.post("/create",authMiddleware ,createGroupCtrl);
groupRoute.get("/",fetchAllGroupsCtrl);
groupRoute.get("/:id",fetchGroupCtrl);
groupRoute.put("/add/:id",authMiddleware, adminAndModeratorAuth, addMemberCtrl);
groupRoute.put("/update/moderator/:id",authMiddleware, adminAuth, updateMemberAsModeratorCtrl);
groupRoute.put("/update/admin/:id",authMiddleware, adminAuth, updateMemberAsAdminCtrl);
groupRoute.put("/remove/:id",authMiddleware, adminAndModeratorAuth, removeMemberCtrl);
groupRoute.delete("/:id",authMiddleware,adminAuth, deleteGroupCtrl);

module.exports = groupRoute;