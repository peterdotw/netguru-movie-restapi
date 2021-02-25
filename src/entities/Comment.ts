import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Length } from "class-validator";

import { Movie } from "./Movie";

@Entity({ database: "docker-db" })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(0, 255)
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Movie, (movie) => movie.comments)
  movie: Movie;
}
