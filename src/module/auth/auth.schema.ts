import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    full_name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, select: false },

    role: {
      type: String,
      enum: ["Customer", "Admin", "DeliveryPersonnel"],
      default: "Admin",
    },

    phone_number: { type: String, required: true, default: null },

    is_deleted: { type: Boolean, default: false },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default model("User", userSchema);
