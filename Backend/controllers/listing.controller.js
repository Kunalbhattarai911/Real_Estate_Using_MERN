import Listing from "../models/listing.model.js"


export const createListing = async(req,res) => {
    try {
        const listing = await Listing.create(req.body)

        return res.status(201).json({
            message : "New Listing Added Successfully",
            success : true,
            listing
        })
    } catch (error) {
        console.log("Error Details:", error);
        return res.status(500).json({
            message : "An Error Occured while adding listing",
            Error : error.message,
            success : false
        })
    }
}