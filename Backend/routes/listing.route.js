import express from "express";
import { isAuthenticated } from "../middlewares/user.isAuthenticated.js";
import { listingValidation } from "../validation/listing.validation.js";
import { createListing, deleteListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, listingValidation , createListing)
router.delete("/deleteListing/:id", isAuthenticated, deleteListing)

export default router;