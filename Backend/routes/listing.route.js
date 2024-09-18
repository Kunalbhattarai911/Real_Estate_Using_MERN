import express from "express";
import { isAuthenticated } from "../middlewares/user.isAuthenticated.js";
import { listingValidation } from "../validation/listing.validation.js";
import { createListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, listingValidation , createListing)

export default router;