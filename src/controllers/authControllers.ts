import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jsonResponse } from "../../lib/jsonResponse";
import { generateToken } from "../../auth/generateTokes";

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, userName } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
 
      res.status(400).json({ error: "User exists" });
      return; 
    }

    const newUser = new UserModel({ userName, email, password });
    await newUser.save();


    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
       res.status(400).json(
        jsonResponse(400, {
          error: "Please fill in all fields",
        })
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
       res.status(401).json({ error: "Unauthorized: authControllers" });
       return;
    }

    const isMatch = password === user.password;

    if (!isMatch) {
       res.status(401).json({ error: "Unauthorized: authControllers" });
    }

   const { token, refreshToken } = generateToken({ userId: user.id, email });

    res.status(200).json(
      jsonResponse(200, {
        message: "User acssed successfully",
        user: user.id,
        token,
        refreshToken,
      })
    );
  } catch (err) {
    res.status(500).json({ error: "Internal server error: authControllers" });
  }
};
