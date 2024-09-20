import express from "express";
import { isAuthenticated } from "../middlewares/user.isAuthenticated.js";
import { listingValidation, updateListingValidator } from "../validation/listing.validation.js";
import { createListing, deleteListing, getSingleListing, updateListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, listingValidation , createListing)
router.delete("/deleteListing/:id", isAuthenticated, deleteListing)
router.put("/updateListing/:id", isAuthenticated , updateListingValidator, updateListing)
router.get("/singleList/:id", isAuthenticated, getSingleListing)

export default router;