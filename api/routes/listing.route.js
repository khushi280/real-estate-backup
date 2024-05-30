import express from 'express'
import { verifyToken } from '../utills/verifyUser.js';
import { 
    getAllListing,
    addListing,
    getListingById,
    updateListing,
    deleteListing,
    getListingByuserId,
    
    
 } from "../controllers/listing.controller.js"

 const listingRouter = express.Router();


listingRouter.post("/",verifyToken, addListing)
listingRouter.delete("/:id",verifyToken, deleteListing)
listingRouter.get("/:id",getListingById)
listingRouter.put("/:id",verifyToken, updateListing)
listingRouter.get("/user/:id",verifyToken,getListingByuserId)
listingRouter.get("/", getAllListing)

export default listingRouter
