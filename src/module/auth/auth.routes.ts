import { Router, Request, Response } from "express";
import { AuthController } from "./auth.controller";

const authController = new AuthController();

export const authRoutes = Router();

authRoutes.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    await authController.login(req, res);
  }
);

