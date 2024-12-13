import { Router } from "express";
import { authRoutes } from "./auth/auth.routes";
import { bookingRoutes } from "./booking/booking.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/bookings", bookingRoutes);

export default routes;