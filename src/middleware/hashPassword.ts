import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export const hashPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { password } = req.body;

  if (!password) {
    res.status(400).json({ error: "Bad Request: hash" });
  }

  await bcrypt.hash(password, 10, (err, data) => {
    if (err) {
      next(err);
    }else{
        req.body.password = data;
        next();
    }
  });
};
