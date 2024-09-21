import mongoose, { Schema, Document, ObjectId } from 'mongoose';

// Define an embedded schema for category
const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  _id: { type: Schema.Types.ObjectId, required: true },
});

// Define an embedded schema for variant-specific store data
const VariantSchema: Schema = new Schema({
  variantId: { type: Schema.Types.ObjectId, required: true }, // Reference to the centralized product variant
  sku: { type: String, required: true }, // Store-specific SKU for the variant
  price: { type: Number, required: true }, // Store-specific price for the variant
  discountedPrice: { type: Number, default: null }, // Store-specific discount price
  stock: { type: Number, required: true }, // Store-specific stock for the variant
  metadata: {
    purchases: { type: Number, default: 0 }, // Store-specific purchases count
    views: { type: Number, default: 0 }, // Store-specific views count
  },
  isActive: { type: Schema.Types.Boolean, required: true },
});

// Define the interface for store product
interface IStoreProduct extends Document {
  storeId: ObjectId;
  productId: ObjectId; // Reference to the centralized product
  name: string; // Store-specific product name (can override centralized product name)
  category: { name: string; _id: ObjectId }; // Store-specific or centralized category
  brand: string; // Store-specific or centralized brand
  description: string; // Store-specific description
  images: string[]; // Store-specific images
  status: 'active' | 'inactive' | 'archived'; // Store-specific product status
  variants: {
    variantId: ObjectId;
    sku: string;
    price: number;
    discountedPrice: number | null;
    stock: number;
    metadata: { purchases: number; views: number };
  }[];
  createdAt: Date;
  updatedAt: Date;
  ratingSummary: { averageRating: number | null; totalReview: number };
}

// Store Product Schema
const StoreProductSchema: Schema<IStoreProduct> = new Schema({
  storeId: { type: String, required: true, index: true }, // Store ID
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the centralized product
    required: true,
    index: true,
  },
  name: { type: String, required: true }, // Store-specific product name
  category: { type: CategorySchema }, // Category details, can be store-specific or inherited
  brand: { type: String, required: true }, // Store-specific or centralized brand
  description: { type: String, required: true }, // Store-specific description
  images: {
    type: [{ type: String }],
    validate: [
      (val: string[]) => val.length > 0,
      'At least one image is required',
    ], // Validation for at least one image
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'], // Enum for product status
    required: true,
    default: 'active',
  },
  variants: [VariantSchema], // Array of store-specific variants
  createdAt: { type: Date, default: Date.now }, // Auto-generated timestamp
  updatedAt: { type: Date, default: Date.now }, // Auto-updated timestamp
  ratingSummary: {
    averageRating: { type: Number, default: null },
    totalReview: { type: Number, default: 0 },
  },
});

// Indexes for efficient querying
StoreProductSchema.index({ storeId: 1, productId: 1 }); // Index for querying products by storeId and productId
StoreProductSchema.index({ 'storeVariants.sku': 1 }); // Index SKU for each variant

// Export the StoreProduct model
export default mongoose.model<IStoreProduct>(
  'StoreProduct',
  StoreProductSchema
);
