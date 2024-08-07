import { UserType } from "@/types/users";
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema<UserType<true>>(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "engineer"],
      default: "customer",
      trim: true,
    },
    password: {
      type: String,
      required: [
        function () {
          return this.creation_method !== "google";
        },
        "Password is required",
      ],
      minlength: [6, "Password must be at least 6 characters long"],
    },

    address: {
      street: {
        type: String,
        required: function () {
          return this.creation_method === "through_order";
        },
        message: "Street address is required when placing an order.",
      },
      postcode: {
        type: String,
        required: function () {
          return this.creation_method === "through_order";
        },
        message: "Postcode is required when placing an order.",
      },
      city: {
        type: String,
        required: function () {
          return this.creation_method === "through_order";
        },
        message: "City is required when placing an order.",
      },
    },
    preferences: {
      mode: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
    },
    skills: {
      type: [String],
    },
    specialty: {
      type: String,
      required: function () {
        return this.role === "engineer";
      },
      message: "Specialty is required for engineers.",
    },

    experience: {
      type: Number,
    },

    creation_method: {
      type: String,
      enum: ["through_order", "by_admin", "registration", "seed", "google"],
      default: "registration",
    },

    placed_orders: {
      type: [Schema.Types.ObjectId],
      ref: "Order",
      default: null,
    },
    received_orders: {
      type: [Schema.Types.ObjectId],
      ref: "Order",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("validate", function (next) {
  if (this.role === "customer") {
    if (
      (this.skills && this.skills?.length > 0) ||
      this.specialty ||
      this.experience !== undefined
    ) {
      return next(
        new Error("Customers should not have skills, specialty, experience")
      );
    }
  }
  next();
});

const User: mongoose.Model<UserType<true>> =
  mongoose.models.User || mongoose.model<UserType<true>>("User", userSchema);

export default User;
