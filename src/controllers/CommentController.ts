import { Request, Response } from "express";

class CommentController {
  static getAllComments = async (_: Request, res: Response) => {
    res.json({ comment: "Best movie of all time." });
  };

  static saveComment = async (_: Request, res: Response) => {
    res.json({ comment: "I love it." });
  };
}

export default CommentController;
