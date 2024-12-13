import { genSalt, hash, compare } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = Number(process.env.BCRYPT_SALT || "12");
    const salt = await genSalt(saltRounds);

    return await hash(password, salt);
  } catch (error) {
    console.error("Error occurred while trying to hash password:", error);
    throw error;
  }
};

export const decryptPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {

    return await compare(password, hashedPassword);
  } catch (error) {
    console.error("Error occurred while trying to compare passwords:", error);
    throw error;
  }
};
