import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUsers, addUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.post("/add", authMiddleware, addUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
