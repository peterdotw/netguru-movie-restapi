import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Movie } from "../entities/Movie";
import OmdbAPI from "../api/OmdbAPI";

class MovieController {
  static getAllMovies = async (_: Request, res: Response) => {
    const movieRepository = getRepository(Movie);
    const movies = await movieRepository.find();

    res.json(movies);
  };

  static saveMovie = async (req: Request, res: Response) => {
    let { title } = req.body;

    let details = await OmdbAPI.getMovieDetails(title);

    let { Director, Year, Genre, Runtime, Actors, Plot } = details;

    let newMovie = new Movie();
    newMovie.title = title;
    newMovie.director = Director;
    newMovie.year = Year;
    newMovie.genre = Genre;
    newMovie.runtime = Runtime;
    newMovie.actors = Actors;
    newMovie.plot = Plot;

    const movieRepository = getRepository(Movie);

    try {
      await movieRepository.save(newMovie);
    } catch (e) {
      res.status(400).send();
      return;
    }

    res.status(201).send("Movie created");
  };
}

export default MovieController;
