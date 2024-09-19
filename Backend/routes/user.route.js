import express from 'express';
import { deleteUser, updateUserInfo } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/user.isAuthenticated.js';
import { updateUserProfile } from '../validation/userUpdateProfile.validation.js';
import { getUserListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.put("/update",isAuthenticated, updateUserProfile ,updateUserInfo);
router.delete("/delete/:id", isAuthenticated,deleteUser);
router.get("/listing", isAuthenticated, getUserListing)


export default router;