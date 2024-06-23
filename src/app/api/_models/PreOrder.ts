import { IOrderItem, IPreOrder } from "@/types/orders";
import { IUser } from "@/types/user";
import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema<IOrderItem>({
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

const preOrderSchema = new mongoose.Schema<IPreOrder>(
  {
    service_info: {
      property_type: {
        type: String,
        enum: ["residential", "commercial"],
        required: true,
      },
      resident_type: {
        type: String,
        enum: ["house", "flat", "hmo"],
        required: function () {
          return this.service_info.property_type === "residential";
        },
      },
      bedrooms: {
        type: Number, // 0 for studio
        required: function () {
          return this.service_info.property_type === "residential";
        },
      },
      order_items: {
        type: [orderItemSchema],
        required: true,
      },
    },
    personal_info: {
      customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: function () {
          return this.status === "personal" || this.status === "payment";
        },
      },
      parking_options: {
        parking_type: {
          type: String,
          enum: ["paid", "free", "unavailable"],
          required: function () {
            return this.status === "personal" || this.status === "payment";
          },
        },
        parking_cost: {
          type: Number,
          required: function () {
            return this.status === "personal" || this.status === "payment";
          },
        },
      },
      congestion_zone: {
        zone_type: {
          type: String,
          enum: ["congestion", "non_congestion"],
          required: function () {
            return this.status === "personal" || this.status === "payment";
          },
        },
        zone_cost: {
          type: Number,
          required: function () {
            return this.status === "personal" || this.status === "payment";
          },
        },
      },
      inspection_date: {
        type: Date,
        required: function () {
          return this.status === "personal" || this.status === "payment";
        },
      },
      inspection_time: {
        type: String,
        required: function () {
          return this.status === "personal" || this.status === "payment";
        },
      },
      order_notes: {
        type: String,
      },
    },
    payment_info: {
      payment_method: {
        type: String,
        enum: ["bank_transfer", "credit_card", "cash_to_engineer"],
        required: function () {
          return this.status === "payment";
        },
      },
    },
    status: {
      type: String,
      enum: ["service", "personal", "payment"],
      default: "service",
    },
  },
  {
    timestamps: true,
  }
);

preOrderSchema.pre("save", function (next) {
  if (this.service_info.property_type === "commercial") {
    this.service_info.resident_type = null;
    this.service_info.bedrooms = null;
  }
  next();
});

const PreOrder: mongoose.Model<IPreOrder<IUser>> =
  mongoose.models.PreOrder || mongoose.model("PreOrder", preOrderSchema);

export default PreOrder;
