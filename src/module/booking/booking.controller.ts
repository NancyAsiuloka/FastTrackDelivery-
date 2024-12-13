import { NextFunction, Request, Response } from "express";
import {
  CreateBooking,
  GetBooking,
  UpdateBooking,
} from "../../types/booking.types";
import { BookingService } from "./booking.service";
import httpStatus from "http-status";

export interface BookingControllerInterface {
  createBooking: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;

  getAll: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;

  getOne: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;

  update: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;

  delete: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
}

export class BookingController implements BookingControllerInterface {
  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  // Create new bookings
  async createBooking(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const data: CreateBooking = req.body;

      const responseData = await this.bookingService.createBooking(data);

      return res.status(httpStatus.CREATED).send({
        message: "Booking created successfully",
        data: responseData,
      });
    } catch (error) {
      console.error("[ERROR]:", error);

      const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const message = "Internal server error during registration";

      return res.status(statusCode).json({
        error: message,
      });
    }
  }

  // Get bookings
  async getAll(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const responseData = await this.bookingService.getAll();

      return res.status(httpStatus.CREATED).send({
        message: "Bookings fetched successfully",
        data: responseData,
      });
    } catch (error) {
      console.error("[ERROR]:", error);

      const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const message = "Internal server error during registration";

      return res.status(statusCode).json({
        error: message,
      });
    }
  }

  //   Get Booking
  async getOne(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const params: GetBooking = req.query;

      const responseData = await this.bookingService.getOne(params);

      return res.status(httpStatus.OK).send({
        message: "Successfully retrieved booking",
        data: responseData,
      });
    } catch (error) {
      console.error("[ERROR]:", error);

      const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error instanceof Error ? error.message : "Internal server error";

      return res.status(statusCode).json({
        error: message,
      });
    }
  }

  async update(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const { id } = req.params;
      const updateData: UpdateBooking = req.body;

      const responseData = await this.bookingService.update(id, updateData);

      return res.status(httpStatus.OK).send({
        message: "Updated Successfully ",
        data: responseData,
      });
    } catch (error) {
      console.error("[ERROR]:", error);

      const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error instanceof Error ? error.message : "Internal server error";

      return res.status(statusCode).json({
        error: message,
      });
    }
  }

  async delete(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const { id } = req.params;
      const responseData = await this.bookingService.delete(id);

      return res.status(httpStatus.OK).send({
        message: "Deleted ",
        data: responseData,
      });
    } catch (error) {
      console.error("[ERROR]:", error);

      const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error instanceof Error ? error.message : "Internal server error";

      return res.status(statusCode).json({
        error: message,
      });
    }
  }
}
