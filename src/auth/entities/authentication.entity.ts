import { PrimaryGeneratedColumn, Column, Entity, RelationId, OneToOne, JoinColumn } from "typeorm";
import User from "./user.entity";

@Entity('authentication')
export default class Authentication {

  @PrimaryGeneratedColumn()
  idx!: number;

  @RelationId((authentication: Authentication) => authentication.user)
  userPhone!: string;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @Column({
    select: false,
  })
  key!: string;
}