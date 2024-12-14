import { hashPassword, decryptPassword } from "../../utils/bcrypt";
import Admin from "./auth.schema";
import { generateToken } from "../../utils/generateToken";
import { LoginUser } from "../../types/user.types";

export class AuthService {
  // Login user and generate JWT
  async login(data: LoginUser) {
    const { email, password } = data;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail) {
      const hashedAdminPassword = await hashPassword(adminPassword); // Hash the admin password from .env

      const match = await decryptPassword(password, hashedAdminPassword);

      if (!match) {
        throw new Error("Invalid credentials");
      }

      let admin = await Admin.findOne({ email: adminEmail });

      if (!admin) {
        const hashedPassword = await hashPassword(adminPassword);

        admin = new Admin({
          email: adminEmail,
          password: hashedPassword,
          role: "admin",
          is_verified: true,
        });

        await admin.save();
      }

      const token = generateToken(String(admin._id));

      return {
        admin,
        token,
      };
    }

    throw new Error("Invalid credentials");
  }
}
