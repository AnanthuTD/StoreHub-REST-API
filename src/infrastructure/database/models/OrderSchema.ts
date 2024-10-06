import mongoose, { Document, Schema } from 'mongoose';

export enum OrderStoreStatus {
  Available = 'Available',
  Failed = 'Failed',
}

export enum OrderReturnStatus {
  NotRequested = 'Not Requested',
  Requested = 'Requested',
  Completed = 'Completed',
}

export enum OrderPaymentStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}

export enum OrderPaymentMethod {
  Razorpay = 'Razorpay',
  COD = 'COD',
}

export enum OrderDeliveryStatus {
  Pending = 'Pending',
  Assigned = 'Assigned',
  InTransit = 'In Transit',
  Delivered = 'Delivered',
}

interface Item {
  productId: mongoose.Schema.Types.ObjectId;
  variantId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
  storeId: mongoose.Schema.Types.ObjectId;
  productName: string;
  storeName: string;
  storeStatus: OrderStoreStatus;
  returnStatus: OrderReturnStatus;
}

export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: Item[];
  totalAmount: number;
  orderDate: Date;
  paymentStatus: OrderPaymentStatus;
  paymentId: string | null;
  paymentMethod: OrderPaymentMethod;
  deliveryPartnerId: mongoose.Schema.Types.ObjectId | null;
  deliveryPartnerName: string | null;
  deliveryStatus: OrderDeliveryStatus;
  shippingAddress?: string;
  deliveryLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
}

const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'StoreProduct',
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        storeId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Shop',
        },
        storeStatus: {
          type: String,
          enum: Object.values(OrderStoreStatus),
          default: OrderStoreStatus.Available,
        },
        returnStatus: {
          type: String,
          enum: Object.values(OrderReturnStatus),
          default: OrderReturnStatus.NotRequested,
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    paymentStatus: {
      type: String,
      enum: Object.values(OrderPaymentStatus),
      default: OrderPaymentStatus.Pending,
    },
    paymentId: { type: String, default: null },
    paymentMethod: {
      type: String,
      enum: Object.values(OrderPaymentMethod),
      required: true,
    },
    deliveryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryPartner',
      default: null,
    },
    deliveryPartnerName: { type: String, default: null },
    deliveryStatus: {
      type: String,
      enum: Object.values(OrderDeliveryStatus),
      default: OrderDeliveryStatus.Pending,
    },
    shippingAddress: { type: String },
    deliveryLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
