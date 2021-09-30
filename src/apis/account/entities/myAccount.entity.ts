import User from "src/apis/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('my_account')
export default class MyAccount {

  @PrimaryGeneratedColumn()
  idx!: number;

  @Column()
  accountId!: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;
}