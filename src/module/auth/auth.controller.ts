import { NextFunction, Request, Response } from "express";
import { LoginUser} from "../../types/user.types";
import { AuthService } from "./auth.service";
import { unauthorized } from "../../utils/error"
import httpStatus from "http-status";

export interface AuthControllerInterface {
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
}
