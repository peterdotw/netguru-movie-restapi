import { Request, Response } from "express";
import { getRepository } from "typeorm";
import isEqual from "lodash.isequal";

import { Movie } from "../entities/Movie";
import OmdbAPI from "../api/OmdbAPI";
import { errorHandler } from "../utils/errorHandler";

export class MovieController {
  static getAllMovies = async (_: Request, res: Response): Promise<void> => {
    const movieRepository = getRepository(Movie);
    const movies = await movieRepository.find({ relations: ["comments"] });

    res.json(movies);
  };

  static saveMovie = async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body;

    const movieRepository = getRepository(Movie);
    const foundMovie = await movieRepository.findOne({ title });

    if (foundMovie !== undefined) {
      errorHandler(res, 400, "Movie already exists in database.");
      return;
    }

    if (title === undefined) {
      errorHandler(res, 400, "Movie title required.");
      return;
    }

    const details = await OmdbAPI.getMovieDetails(title);

    if (isEqual(details, { Response: "False", Error: "Movie not found!" })) {
      errorHandler(res, 400, "Movie not found in OmdbAPI.");
      return;
    }

    const { Director, Year, Genre, Runtime, Actors, Plot } = details;

    const newMovie = new Movie();
    newMovie.title = title;
    newMovie.director = Director;
    newMovie.year = Year;
    newMovie.genre = Genre;
    newMovie.runtime = Runtime;
    newMovie.actors = Actors;
    newMovie.plot = Plot;

    await movieRepository.save(newMovie);

    res.sendStatus(201);
  };
}
