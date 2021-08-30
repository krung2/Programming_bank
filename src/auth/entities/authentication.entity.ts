import { PrimaryGeneratedColumn, Column, Entity, RelationId, ManyToOne, JoinColumn } from "typeorm";
import User from "./user.entity";

@Entity('authentication')
export default class Authentication {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @RelationId((authentication: Authentication) => authentication.user)
  userPhone!: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @Column({
    select: false,
  })
  key!: string;
}