import jwt from "jsonwebtoken";

interface IPayload {
  userId: string;
  email: string;
}

export const generateToken = (
  payload: IPayload
): {
  token: string;
  refreshToken: string;
} => {
  const token = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET || "access_secret",
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
    {
      algorithm: "HS256",
      expiresIn: "3d",
    }
  );
  return {
    token,
    refreshToken,
  };
};
