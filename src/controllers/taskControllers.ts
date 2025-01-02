import taskModel, { ITask } from "../models/taskModel";
import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

const createByUser = async (
  title: string,
  userId: string, 
  description?: string
): Promise<ITask> => {

  if (!userId) {
    throw new Error("User ID is required");
  }

  const task = new taskModel({
    title,
    description,
    user: userId, 
  });

  await task.save();

  return task;
};


const getById = async (id: string): Promise<ITask | null> => {
  return taskModel.findById(id);
};


const updateByUser = async (
  userId: string,
  id: string,
  title?: string,
  description?: string,
  completed?: boolean
): Promise<ITask | null> => {
  const task = await taskModel.findOne({ _id: id, user: userId });
  if (!task) return null;

  if (title) task.title = title;
  if (description) task.description = description;
  if (completed !== undefined) task.completed = completed;

  await task.save();
  return task;
};

const deleteByUser = async (
  userId: string,
  id: string
): Promise<string | null> => {
  const task = await taskModel.findOne({ _id: id, user: userId });
  if (!task) return null;

  await task.remove();
  return "Task deleted successfully";
};

const getTasksByStatus = async (
  userId: string,
  completed: boolean
): Promise<ITask[]> => {
  try {
    const tasks = await taskModel.find({ user: userId, completed: completed });
    return tasks;
  } catch (error) {
    throw new Error("Error retrieving tasks");
  }
};



export const createTaskByUser = [
  param("userId").isMongoId().withMessage("User ID must be a valid ObjectId"), 
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  async (req: Request, res: Response): Promise<void> => {

    try {
      const { title, description } = req.body;
      const { userId } = req.params; 

      const task = await createByUser(title, userId, description);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
];


export const getByIdTask = [
  param("id").isMongoId().withMessage("Invalid task : : taskControllers"),

  async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await getById(req.params.id);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ error: "Not Found: : taskControllers" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
];

export const updateTaskByUser = [
  param("userId").isMongoId().withMessage("User ID must be a valid ObjectId"), 
  param("id").isMongoId().withMessage("Invalid task ID"), 
  body("title").optional().isString().withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),

  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, id } = req.params; 
      const { title, description, completed } = req.body;

      const task = await updateByUser(
        userId,
        id,
        title,
        description,
        completed
      );

      if (task) {
        res.status(200).json(task);
      } else {
        res
          .status(404)
          .json({ error: "Not Found: taskControllers" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
];

export const removeTaskByUser = [
  param("userId").isMongoId().withMessage("User ID must be a valid ObjectId"), 
  param("id").isMongoId().withMessage("Invalid task ID"), 

  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, id } = req.params; 

      const result = await deleteByUser(userId, id);
      if (result) {
        res.status(200).json({ message: result });
      } else {
        res
          .status(404)
          .json({ error: "Not Found: taskDashboard" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
];

export const getTasksByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Bad request: taskControllers" });
    }

    const tasks = await taskModel.find({ user: userId });

    if(!tasks) {
        return res.status(404).json({ error: "Not Found: taskControllers" });
    }

     return res.json(tasks);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};


export const filterTasksByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, status } = req.params;

  const completed = status === "completed"; 

  try {
    const tasks = await getTasksByStatus(userId, completed);

    if (tasks.length > 0) {
      res.status(200).json(tasks);
    } else {
      res
        .status(404)
        .json({ message: "No tasks found for the given user and status." });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

