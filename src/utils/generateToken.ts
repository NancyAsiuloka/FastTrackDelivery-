import jwt from "jsonwebtoken";

export const createTrackingCode = (): string => {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters[randomIndex];
    }

    return randomCode;
  };


// Generates a JWT token
export const generateToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY as string, {
    expiresIn: "1h",
  });
  return token;
};
