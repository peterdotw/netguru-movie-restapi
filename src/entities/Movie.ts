import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import { Comment } from "./Comment";

@Entity({ database: "docker-db" })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  year: number;

  @Column()
  director: string;

  @Column()
  runtime: string;

  @Column()
  genre: string;

  @Column()
  actors: string;

  @Column()
  plot: string;

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;
}
