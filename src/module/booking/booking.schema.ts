import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    trackingCode: {
      type: String,
      unique: true,
      required: [true, "Tracking code is required"],
    },

    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    sender: {
      name: {
        type: String,
        required: [true, "Sender's name is required"],
      },
      address: {
        type: String,
        required: [true, "Sender's address is required"],
      },
      email: {
        type: String,
        required: [true, "Sender's email is required"],
      },
      phone: {
        type: String,
        required: [true, "Sender's phone number is required"],
      },
    },

    receiver: {
      name: {
        type: String,
        required: [true, "Receiver's name is required"],
      },
      address: {
        type: String,
        required: [true, "Receiver's address is required"],
      },
      email: {
        type: String,
        required: [true, "Receiver's email is required"],
      },
      phone: {
        type: String,
        required: [true, "Receiver's phone number is required"],
      },
    },

    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },

    arrivedDate: {
      type: Date,
      default: null,
    },

    deliveryDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("Booking", bookingSchema);
