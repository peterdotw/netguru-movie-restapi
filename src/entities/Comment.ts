import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { Movie } from "./Movie";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Movie, (movie) => movie.comments)
  movie: Movie;
}
