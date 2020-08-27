import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Comment } from "../entities/Comment";
import { Movie } from "../entities/Movie";

export class CommentController {
  static getAllComments = async (_: Request, res: Response): Promise<void> => {
    const commentRepository = getRepository(Comment);
    const comments = await commentRepository.find();

    res.json(comments);
  };

  static saveComment = async (req: Request, res: Response): Promise<void> => {
    let { comment, movie } = req.body;

    const movieRepository = getRepository(Movie);
    const commentRepository = getRepository(Comment);
    const foundMovie = await movieRepository.findOne({ title: movie });

    if (foundMovie === undefined) {
      res.sendStatus(400);
      return;
    }

    let newComment = new Comment();
    newComment.comment = comment;
    newComment.movie = foundMovie;

    const errors = await validate(newComment);

    if (errors.length > 0) {
      res.sendStatus(400);
      return;
    }

    await commentRepository.save(newComment);

    res.sendStatus(201);
  };
}
