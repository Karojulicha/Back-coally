import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

import { Request, Response, NextFunction } from 'express';


const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(403).json({ error: 'Forbidden: authMiddleware' });
    }

     try {
       const decoded = jwt.verify(
         token,
         process.env.ACCESS_TOKEN_SECRET || "secret-key"
       ) as {
         id: string;
         email: string;
       };
       req.body = decoded; 
       next();
     } catch (err) {
       res.status(400).json({ error: "Invalid token" });
     }

}