import mongoose, { Document } from "mongoose";

interface IBlacklistedToken extends Document {
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

const blacklistedTokenSchema = new mongoose.Schema<IBlacklistedToken>(
  {
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: false }
);

const BlacklistedToken =
  mongoose.models.BlacklistedToken ||
  mongoose.model("BlacklistedToken", blacklistedTokenSchema);

export default BlacklistedToken;
