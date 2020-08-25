import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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

  @CreateDateColumn()
  created_at: Date;
}
