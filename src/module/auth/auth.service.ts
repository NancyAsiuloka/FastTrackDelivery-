import bcrypt from "bcrypt";
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
      const match = await bcrypt.compare(password, adminPassword);
      if (!match) {
        throw new Error("Invalid credentials");
      }

      let admin = await Admin.findOne({ email: adminEmail });

      if (!admin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

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
        token,
      };
    }
  }
}
