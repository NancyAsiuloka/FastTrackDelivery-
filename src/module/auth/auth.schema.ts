import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, select: false },

    role: {
      type: String,
      default: "admin",
    },

    is_verified: { type: Boolean, default: false },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default model("Admin", adminSchema);
