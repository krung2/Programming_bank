import Account from "src/account/entities/account.entity";
import { PrimaryGeneratedColumn, Column, Entity, RelationId, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity('send')
export default class Send {

  @PrimaryGeneratedColumn()
  idx!: number;

  @Column()
  reciverId: string;

  @RelationId((send: Send) => send.account)
  accountId!: string;

  @JoinColumn({ name: 'reciever_id' })
  @ManyToOne(type => Account, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account!: Account;

  @Column({
    type: 'varchar'
  })
  money: number;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}