import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      offer,
      imageUrls,
      userRef,
    } = req.body;

    const userId = req.id;

    const listing = await Listing.create({
      userId,
      name,
      type,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      offer,
      imageUrls,
      userRef,
    });

    return res.status(201).json({
      message: "New Listing Added Successfully",
      success: true,
      listing,
    });
  } catch (error) {
    console.log("Error Details:", error);
    return res.status(500).json({
      message: "An Error Occured while adding listing",
      Error: error.message,
      success: false,
    });
  }
};

export const getUserListing = async (req, res) => {
  try {
    const userId = req.id;
    //   console.log("User ID in getUserListing:", userId);

    const userListing = await Listing.find({ userId });

    return res.status(200).json({
      message: "User Listings retrieved successfully",
      success: true,
      userListing,
    });
  } catch (error) {
    console.log("Error Details:", error);
    return res.status(500).json({
      message: "An Error Occured while retrieving the listing of this user",
      Error: error.message,
      success: false,
    });
  }
};


export const deleteListing = async (req,res) => {
    try {
        const userId = req.id;
        const { id }= req.params;

        const listing = await Listing.findOneAndDelete({_id : id, userId})

        if(!listing) {
            return res.status(404).json({
                message : "Listing not found",
                success : false
            })
        }

        return res.status(200).json({
            message : "Listing deleted Successfully.",
            success : true
        });

    }  catch (error) {
        console.log("Error Details:", error);
        return res.status(500).json({
          message: "An Error Occured while deleting the listing of this user",
          Error: error.message,
          success: false,
        });
      }
    };