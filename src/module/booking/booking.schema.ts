import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    contactDetails: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "is invalid"],
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
    },
    parcels: [
      {
        trackingNumber: {
          type: String,
          required: true,
          trim: true,
        },
        productName: {
          type: String,
          required: true,
          trim: true
        },
        senderDetails: {
          name: { type: String, required: true, trim: true },
          address: { type: String, required: true, trim: true },
          phone: { type: String, required: true },
        },
        recipientDetails: {
          name: { type: String, required: true, trim: true },
          address: { type: String, required: true, trim: true },
          phone: { type: String, required: true },
        },
        weight: {
          type: Number,
          required: true,
          min: [0, "Weight must be positive"],
        },
        status: {
          type: String,
          enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
          default: "Pending",
        },
        deliveryDate: {
          type: Date,
          required: function () {
            return this.status === "Delivered";
          },
        },
        pickupDate: {
          type: Date,
          default: Date.now,
        },
        cost: {
          type: Number,
          required: true,
          min: [0, "Cost must be positive"],
        },
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("Booking", bookingSchema);
