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
    const { productName, sender, receiver } = data;
    const trackingCode = createTrackingCode();
    const arrivedDate = new Date();

    const deliveryDate = new Date();
    deliveryDate.setDate(arrivedDate.getDate() + 3);

    const newBooking = await Booking.create({
      trackingCode,
      productName,
      sender,
      receiver,
      arrivedDate,
      deliveryDate,
    });

    return {
      newBooking,
    };
  }

  //   GET ALL BOOKINGS
  async getAll() {
    const bookings = await Booking.find().select({
      trackingCode: 1,
      productName: 1,
    });

    return {
      bookings,
    };
  }

  //   GET ONE BOOKING
  async getOne(data: GetBooking) {
    const { trackingCode, id } = data;

    const query: any = {};
    if (id) query._id = id;
    if (trackingCode) query.trackingCode = trackingCode;

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
  async update(id: String, data: UpdateBooking) {
    const { ...updateFields } = data;

    const update = await Booking.findOneAndUpdate(
      { _id: id },
      { ...updateFields },
      { new: true }
    );

    return {
      update,
    };
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
