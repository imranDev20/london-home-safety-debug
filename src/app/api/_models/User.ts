import { UserType } from "@/types/users";
import mongoose from "mongoose";

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
    email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["customer", "admin", "engineer"],
      default: "customer",
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
      required: true,
      enum: ["through_order", "by_admin", "registration", "seed"],
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
