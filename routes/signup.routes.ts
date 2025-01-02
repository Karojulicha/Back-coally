import { Router } from "express";
import { hashPassword } from "../src/middleware/hashPassword";
import { signIn } from "../src/controllers/authControllers";

const router = Router();
 
router.post("/", signIn);


export default router;
