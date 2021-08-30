import User from "src/user/entities/user.entity";
import { Column, PrimaryColumn, Entity, ManyToOne, JoinColumn, RelationId } from "typeorm";
import Authentication from "../../auth/entities/authentication.entity";

@Entity('account')
export default class Account {

  @PrimaryColumn({
    name: 'account_id'
  })
  accountId!: string;

  @Column({
    type: 'varchar',
  })
  money: number;

  @RelationId((authentication: Authentication) => authentication.user)
  userPhone!: string;

  @JoinColumn({ name: 'user_phone' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;
}