import { Router } from "express";
import { loginUser } from "../src/controllers/authControllers";

const router = Router();
router.post("/", loginUser);

export default router;
