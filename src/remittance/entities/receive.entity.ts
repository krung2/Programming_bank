import Account from "src/account/entities/account.entity";
import { PrimaryGeneratedColumn, Column, Entity, RelationId, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity('receive')
export default class Receive {

  @PrimaryGeneratedColumn()
  idx!: number;

  @Column()
  senderId: string;

  @RelationId((receive: Receive) => receive.account)
  accountId!: string;

  @JoinColumn({ name: 'reciever_id' })
  @ManyToOne(type => Account, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account!: Account;

  @Column()
  money: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}