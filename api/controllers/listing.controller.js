import  mongoose  from 'mongoose'
import  ListingModel from '../models/listing.model.js'
import { errorHandler } from "../utills/error.js";

export const getAllListing = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const listings = await ListingModel.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };

export const addListing = async (req, res)=>{
    // const data = req.body
    // console.log(data);
    
    try {
        let listing = await ListingModel.create(req.body)
        
        res.status(201).json(listing)
    } catch (error) {
        res.status(400).json(error)
    }
}


    export const getListingByuserId = async (req, res, next) => {
        try {
          const listing = await ListingModel.find({ userRef: req.params.id });
          // const listing=await ListingModel.findById(_id)
          if (!listing) {
            return next(errorHandler(404, 'Record not found!'));
          }
          res.status(200).json(listing);
        } catch (error) {
          next(error);
        }
      };


export const updateListing = async(req, res)=>{
    try {
        const { id } = req.params
        
        const listing = await ListingModel.findOneAndUpdate({"_id": id}, req.body, {new: true})
        if(listing){
            res.status(200).json(listing)
        } else {
            res.status(404).json({"message": "Record not found"})
        }
    } catch (error) {
        if(error.name === "CastError"){
            res.status(400).json({"message": "Invalid Id"})
        } else {
            res.status(500).json(error)
        }
    }
}

export const deleteListing = async(req, res)=>{
    
    try {
        const { id} = req.params
        const listing = await ListingModel.findOneAndDelete({"_id": id})
        if(listing){
            res.status(200).json(listing)
        } else {
            res.status(404).json({"message": "Record not found"})
        }
    } catch (error) {
        if(error.name === "CastError"){
            res.status(400).json({"message": "Invalid Id"})
        } else {
            res.status(500).json(error)
        }
    }
}
export const getListingById = async (req, res, next) => {
  try {
    // const listing = await ListingModel.findb({ userRef: req.params.id });
    // const listing=await ListingModel.findById(_id)
    const { id } = req.params
        
        const listing = await ListingModel.find({"_id": id})
    if (!listing) {
      return next(errorHandler(404, 'Record not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

      

