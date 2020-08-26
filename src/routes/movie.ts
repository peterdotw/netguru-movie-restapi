import { Router } from "express";
import { MovieController } from "../controllers/MovieController";

const router = Router();

router.get("/", MovieController.getAllMovies);
router.post("/", MovieController.saveMovie);

export default router;
