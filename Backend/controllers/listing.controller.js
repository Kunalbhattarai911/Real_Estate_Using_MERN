import mongoose from "mongoose";
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

export const deleteListing = async (req, res) => {
  try {
    const userId = req.id;
    const { id } = req.params;

    const listing = await Listing.findOneAndDelete({ _id: id, userId });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Listing deleted Successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error Details:", error);
    return res.status(500).json({
      message: "An Error Occured while deleting the listing of this user",
      Error: error.message,
      success: false,
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

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

    let listing = await Listing.findOne({_id : id, userId})

    if(!listing) {
      return res.status(404).json({
        message : "Listing not found",
        success : false
      })
    }

    if(name) listing.name = name;
    if(type) listing.type = type;
    if(description) listing.description = description; 
    if(address) listing.address = address;
    if(regularPrice) listing.regularPrice = regularPrice;
    if(discountPrice) listing.discountPrice = discountPrice;
    if(furnished) listing.furnished = furnished;
    if(bathrooms) listing.bathrooms = bathrooms;
    if(bedrooms) listing.bedrooms = bedrooms;
    if(parking) listing.parking = parking;
    if(offer) listing.offer = offer;
    if(imageUrls) listing.imageUrls = imageUrls;
    if(userRef) listing.userRef = userRef;

    await listing.save()

    return res.status(201).json({
      message : "Listing updated successfully",
      success : true,
      listing
    })
  } catch (error) {
    console.log("Error Details:", error);
    return res.status(500).json({
      message : "An Error Occured While Updating The Listing",
      Error : error.message,
      success : false
    })
  }
};


export const getSingleListing = async(req,res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
          message: "Invalid task ID format",
          success: false
      });
  }

    const listing = await Listing.findOne({_id : id})

    if(!listing) {
      return res.status(404).json({
        message : "No Listing Found",
        success : false,
      })
    }

    return res.status(200).json({
      message : "the listing is :",
      success :true,
      listing
    })
  } catch (error) {
    console.log("Error Details", error);
    return res.status(500).json({
        message: "An error occurred while retrieving the listing",
        success: false,
        error: error.message 
    });
}
};

export const searchListings = async (req, res) => {
  try {
    const {
      name,
      type,
      bedrooms,
      bathrooms,
      furnished,
      parking,
      offer,
      minPrice,
      maxPrice,
      address,
      page = 1, // Default to page 1
      limit = 10, // Default to 10 items per page
    } = req.query;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    if (type) {
      query.type = type;
    }
    if (bedrooms) {
      query.bedrooms = bedrooms;
    }
    if (bathrooms) {
      query.bathrooms = bathrooms;
    }
    if (furnished !== undefined) {
      query.furnished = furnished === 'true';
    }
    if (parking !== undefined) {
      query.parking = parking === 'true';
    }
    if (offer !== undefined) {
      query.offer = offer === 'true';
    }
    if (minPrice) {
      query.regularPrice = { ...query.regularPrice, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      query.regularPrice = { ...query.regularPrice, $lte: Number(maxPrice) };
    }
    if (address) {
      query.address = { $regex: address, $options: 'i' };
    }

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate the number of items to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch listings with pagination
    const listings = await Listing.find(query).skip(skip).limit(limitNumber);
    const totalListings = await Listing.countDocuments(query); // Total count for pagination

    res.status(200).json({
      totalListings,
      totalPages: Math.ceil(totalListings / limitNumber),
      currentPage: pageNumber,
      listings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
