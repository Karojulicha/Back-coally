import { Router } from "express";
import {
  createTaskByUser,
  filterTasksByStatus,
  getByIdTask,
  removeTaskByUser,
  updateTaskByUser,
} from "../src/controllers/taskControllers";

const router = Router();

router.post("/tasks/user/:userId", createTaskByUser);
router.get("/tasks/:id", getByIdTask);
router.put("/tasks/user/:userId/:id", updateTaskByUser);
router.delete("/tasks/user/:userId/:id", removeTaskByUser);
router.get("/tasks/user/:userId/status/:status", filterTasksByStatus);


export default router;