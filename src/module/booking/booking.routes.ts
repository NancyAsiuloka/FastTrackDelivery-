import { Router, Request, Response } from "express";
import { BookingController } from "./booking.controller";
import { AuthMiddleware } from "../../utils/middleware";

const bookingController = new BookingController();
const authMiddleware = new AuthMiddleware();

export const bookingRoutes = Router();

bookingRoutes.post(
  "/",
  authMiddleware.use.bind(authMiddleware),
  async (req: Request, res: Response): Promise<void> => {
    await bookingController.createBooking(req, res);
  }
);

bookingRoutes.get(
  "/",
  authMiddleware.use.bind(authMiddleware),
  async (req: Request, res: Response): Promise<void> => {
    await bookingController.getAll(req, res);
  }
);

bookingRoutes.get(
  "/booking",
  authMiddleware.use.bind(authMiddleware),
  async (req: Request, res: Response): Promise<void> => {
    await bookingController.getOne(req, res);
  }
);

bookingRoutes.put(
  "/:id",
  authMiddleware.use.bind(authMiddleware),
  async (req: Request, res: Response): Promise<void> => {
    await bookingController.update(req, res);
  }
);

bookingRoutes.delete(
  "/:id",
  authMiddleware.use.bind(authMiddleware),
  async (req: Request, res: Response): Promise<void> => {
    await bookingController.delete(req, res);
  }
);
