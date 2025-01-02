import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World! SING OUT");
});

export default router;