import Express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import tasksRoutes from "../routes/tasks.routes";
import userRoutes from "../routes/user.routes";
import loginRoutes from "../routes/login.routes";
import refreshTokenRoutes from "../routes/refreshToken.routes";
import signUpRoutes from "../routes/signup.routes";
import singOutRoutes from "../routes/signout.routes";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();
console.clear();

const app = Express();

app.use(Express.json());
app.use(cors());

app.use("/api/tasks", tasksRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/user", userRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/signout", singOutRoutes);
app.use("/api/signup", signUpRoutes);

export default app;