import express from 'express';
import { deleteUser, getUser, updateUserInfo } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/user.isAuthenticated.js';
import { updateUserProfile } from '../validation/userUpdateProfile.validation.js';
import { getUserListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.put("/update",isAuthenticated, updateUserProfile ,updateUserInfo);
router.delete("/delete/:id", isAuthenticated,deleteUser);
router.get("/listing", isAuthenticated, getUserListing)
router.get("/:id", isAuthenticated, getUser)


export default router;