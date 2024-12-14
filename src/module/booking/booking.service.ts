import Booking from "./booking.schema";
import { createTrackingCode } from "../../utils/generateToken";
import {
  CreateBooking,
  GetBooking,
  UpdateBooking,
} from "../../types/booking.types";

export class BookingService {
  // CREATE BOOKING
  async createBooking(data: CreateBooking) {
    const { serviceName, contactDetails, parcels } = data;

    const processedParcels = parcels.map((parcel) => {
      const trackingNumber = createTrackingCode();
      const pickupDate = new Date();

      const deliveryDate = new Date(pickupDate);
      deliveryDate.setDate(pickupDate.getDate() + 3);

      return {
        ...parcel,
        trackingNumber,
        pickupDate,
        deliveryDate,
        status: "Pending",
      };
    });

    const newBooking = await Booking.create({
      serviceName,
      contactDetails,
      parcels: processedParcels,
    });

    return {
      newBooking,
    };
  }

  //   GET ALL BOOKINGS
  async getAll() {
    const bookings = await Booking.find().select({
      "parcels.trackingNumber": 1,
      "parcels.productName": 1,
    });

    return {
      bookings,
    };
  }

  //   GET ONE BOOKING
  async getOne(data: GetBooking) {
    const { trackingNumber, id } = data;

    const query: any = {};
    if (id) query._id = id;
    if (trackingNumber) query["parcels.trackingNumber"] = trackingNumber;

    if (!Object.keys(query)) {
      throw new Error("No identifier provided to fetch booking!");
    }

    const booking = await Booking.findOne(query);

    if (!booking) {
      throw new Error("No bookings found!");
    }

    return { booking };
  }

  //   UPDATE BOOKING
  async update(id: string, data: UpdateBooking) {
    const { serviceName, contactDetails, parcels } = data;

    if (!Array.isArray(parcels) || parcels.length === 0) {
      throw new Error("Parcels must be a non-empty array.");
    }

    // Helper function to update parcel fields conditionally
    const updateParcelFields = (parcel: any) => {
      const updatedParcel: any = {};
      const parcelFields = [
        "productName",
        "senderDetails",
        "recipientDetails",
        "weight",
        "status",
        "cost",
        "deliveryDate",
      ];

      parcelFields.forEach((field) => {
        if (parcel[field]) {
          updatedParcel[field] = parcel[field];
        }
      });

      return updatedParcel;
    };

    const updatedParcels = parcels.map(updateParcelFields);

    // Prepare the update query
    const updateFields = {
      serviceName,
      contactDetails,
      parcels: updatedParcels,
    };

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: id },
      { ...updateFields },
      { new: true }
    );

    if (!updatedBooking) {
      throw new Error("Booking not found!");
    }

    return { updatedBooking };
  }

  //  DELETE BOOKING
  async delete(id: String) {
    const deletedBooking = await Booking.findOneAndDelete(
      { _id: id },

      { new: true }
    );

    return {
      deletedBooking,
    };
  }
}
