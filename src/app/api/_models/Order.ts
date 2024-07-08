import mongoose, { Schema } from "mongoose";
import { OrderItemType, OrderType, OrderTypeForResponse } from "@/types/orders"; // Changed the type name here
import { ORDER_STATUS } from "@/shared/constants";
import { OrderStatus } from "@/types/orders";
import { UserType } from "@/types/users";

const orderStatusSchema = new Schema<OrderStatus>({
  status: {
    type: String,
    required: true,
    enum: ORDER_STATUS,
    default: "awaiting_confirmation",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const orderItemSchema = new Schema<OrderItemType>({
  // Changed the schema name here
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema<OrderType>(
  {
    property_type: {
      type: String,
      enum: ["residential", "commercial"],
      required: true,
    },
    resident_type: {
      type: String,
      enum: ["house", "flat", "hmo"],
      required: function () {
        return this.property_type === "residential";
      },
    },
    bedrooms: {
      type: Number,
      required: function () {
        return this.property_type === "residential";
      },
    },
    order_items: {
      type: [orderItemSchema],
      required: true,
    },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parking_options: {
      parking_type: {
        type: String,
        enum: ["paid", "free", "unavailable"],
        required: true,
      },
      parking_cost: {
        type: Number,
        required: true,
      },
    },
    congestion_zone: {
      zone_type: {
        type: String,
        enum: ["congestion", "non_congestion"],
        required: true,
      },
      zone_cost: {
        type: Number,
        required: true,
      },
    },
    inspection_date: {
      type: Date,
      required: true,
    },
    inspection_time: {
      type: String,
      required: true,
    },
    order_notes: {
      type: String,
    },
    payment_method: {
      type: String,
      required: true,
    },
    order_status: {
      type: [orderStatusSchema],
      required: true,
    },
    assigned_engineer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    remaining_amount: {
      type: Number,
      required: true,
    },
    paid_amount: {
      type: Number,
      required: true,
    },
    invoice_id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to set initial order status
orderSchema.pre("save", function (next) {
  if (this.isNew && this.order_status.length === 0) {
    this.order_status.push({
      status: "awaiting_confirmation",
      timestamp: new Date(),
    });
  }
  next();
});

const Order: mongoose.Model<OrderTypeForResponse<UserType>> =
  mongoose.models.Order || mongoose.model<OrderType>("Order", orderSchema);

export default Order;
