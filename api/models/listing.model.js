import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact:{
        type: Number,
        required:true,
    },
    type: {
      type: String,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      // required: function() { return this.offer; }
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  }
  },
  { timestamps: true }
);

const ListingModel = mongoose.model("listing", listingSchema)
export default ListingModel