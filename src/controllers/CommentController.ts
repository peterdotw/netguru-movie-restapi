import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Comment } from "../entities/Comment";
import { Movie } from "../entities/Movie";

export class CommentController {
  static getAllComments = async (_: Request, res: Response) => {
    const commentRepository = getRepository(Comment);
    const comments = await commentRepository.find();

    res.json(comments);
  };

  static saveComment = async (req: Request, res: Response) => {
    let { comment, movie } = req.body;

    const movieRepository = getRepository(Movie);

    const foundMovie = await movieRepository.findOne({ title: movie });

    if (foundMovie === undefined) {
      res.sendStatus(400);
      return;
    }

    let newComment = new Comment();
    newComment.comment = comment;
    newComment.movie = foundMovie;

    const commentRepository = getRepository(Comment);

    try {
      await commentRepository.save(newComment);
    } catch (e) {
      res.sendStatus(400);
      return;
    }

    res.sendStatus(201);
  };
}
