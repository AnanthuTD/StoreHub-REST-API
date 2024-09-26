import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IShop extends Document {
  _id: ObjectId;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  products: ObjectId[] | null;
  ownerId: ObjectId;
  averageRating: number | null;
  categories: string | null;
  isVerified: boolean | null;
  address: {
    city: string | null;
    country: string | null;
    postalCode: string | null;
    state: string | null;
    street: string | null;
  };
  description: string | null;
  contactInfo: {
    email: string | null;
    phone: string | null;
    website: string | null;
  };
  operatingHours: {
    friday: string | null;
    monday: string | null;
    saturday: string | null;
    sunday: string | null;
    thursday: string | null;
    tuesday: string | null;
    wednesday: string | null;
  };
  images: string[] | null;
}

const ShopSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  ownerId: { type: Schema.Types.ObjectId, required: true, ref: 'Owner' },
  averageRating: { type: Number },
  categories: { type: String, enum: ['electronics', 'clothing'] },
  isVerified: { type: Boolean, required: true, default: false },
  address: {
    city: { type: String },
    country: { type: String },
    postalCode: { type: String },
    state: { type: String },
    street: { type: String },
  },
  description: { type: String },
  contactInfo: {
    email: { type: String },
    phone: { type: String },
    website: { type: String },
  },
  operatingHours: {
    friday: { type: String },
    monday: { type: String },
    saturday: { type: String },
    sunday: { type: String },
    thursday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
  },
  images: [{ type: String }],
});

ShopSchema.index({ location: '2dsphere' }); // Geospatial index on location field

const Shop = mongoose.model<IShop>('Shop', ShopSchema);

export default Shop;
