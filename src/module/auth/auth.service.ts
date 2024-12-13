import User from "./auth.schema";
import { hashPassword, decryptPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/generateToken";
import { RegisterUser, LoginUser } from "../../types/user.types";

export class AuthService {
  async register(data: RegisterUser) {
    const { full_name, email, password, phone_number } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
    });

    return {
      user: newUser,
    };
  }

  // Login user and generate JWT
  async login(data: LoginUser) {
    const user = await User.findOne({ email: data.email }).select(
      "+password"
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await decryptPassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    const token = generateToken(user.id);

    return {
      user,
      token,
    };
  }
}
