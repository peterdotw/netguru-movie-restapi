import { Router } from "express";
import CommentController from "../controllers/CommentController";

const router = Router();

router.get("/", CommentController.getAllComments);
router.post("/", CommentController.saveComment);

export default router;
