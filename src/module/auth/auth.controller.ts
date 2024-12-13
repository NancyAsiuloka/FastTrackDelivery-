import { NextFunction, Request, Response } from "express";
import { LoginUser, RegisterUser } from "../../types/user.types";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

// Example unauthorized error handling structure
const unauthorized = {
  httpCode: 401,
  message: "Invalid credentials"
};

export interface AuthControllerInterface {
  register: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
  login: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<unknown, Record<string, unknown>> | void>;
}

export class AuthController implements AuthControllerInterface {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
}

  async login(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const data: LoginUser = req.body;

      const responseData = await this.authService.login(data);

      return res.status(httpStatus.OK).send({
        message: "User authenticated successfully",
        responseData,
      });
    } catch (error) {
      console.error("[LOGIN ERROR]:", error);
      const statusCode = unauthorized.httpCode;
      const message = unauthorized.message;
      return res.status(statusCode).json({
        error: message,
      });
    }
  }

  // Register new user
  async register(
    req: Request,
    res: Response
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const data: RegisterUser = req.body;

      const responseData = await this.authService.register(data);

      return res.status(httpStatus.CREATED).send({
        message: "User registered successfully",
        data: responseData,
      });
    } catch (error) {
      console.error("[REGISTER ERROR]:", error);

      const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const message = "Internal server error during registration";

      return res.status(statusCode).json({
        error: message,
      });
    }
  }
}
