import { TokenType } from "@/types/account";
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema<TokenType>(
  {
    token: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    is_verified: {
      type: Boolean,
      default: false,
    },
    expiry: { type: Date, default: () => new Date(Date.now() + 3 * 60 * 1000) },
    duration: {
      type: String,
      default: "3m",
    },
    type: {
      type: String,
      required: true,
      enum: ["reset-password", "verify-email", "auth"],
    },
  },
  { timestamps: true }
);
const Token: mongoose.Model<TokenType> =
  mongoose.models?.Token || mongoose.model<TokenType>("Token", tokenSchema);

export default Token;
