import Receive from "src/apis/remittance/entities/receive.entity";
import Send from "src/apis/remittance/entities/send.entity";
import User from "src/apis/user/entities/user.entity";
import { Column, PrimaryColumn, Entity, ManyToOne, JoinColumn, RelationId, OneToMany } from "typeorm";
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

  @Column({
    select: false
  })
  password: string;

  @RelationId((authentication: Authentication) => authentication.user)
  userPhone!: string;

  @JoinColumn({ name: 'user_phone' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @OneToMany(type => Receive, receive => receive.account)
  receive!: Receive[];

  @OneToMany(type => Send, send => send.account)
  send!: Send[];
}