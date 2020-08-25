import { Request, Response } from "express";

class MovieController {
  static getAllMovies = async (_: Request, res: Response) => {
    res.json({ movie: "Joker" });
  };

  static saveMovie = async (req: Request, res: Response) => {
    res.json({ movie: "Batman" });
  };
}

export default MovieController;
