import Account from "src/apis/account/entities/account.entity";
import MyAccount from "src/apis/account/entities/myAccount.entity";
import { Column, PrimaryColumn, Entity, OneToOne, OneToMany } from "typeorm";
import Authentication from "../../auth/entities/authentication.entity";

@Entity('user')
export default class User {

  @PrimaryColumn()
  phone!: string;

  @Column({
    unique: true,
  })
  id: string;

  @Column({
    select: false,
  })
  pw: string;

  @Column()
  name: string;

  @Column()
  birth: string;

  @OneToMany(type => Authentication, authentication => authentication.user)
  authentication!: Authentication[];

  @OneToMany(type => Account, account => account.user)
  account!: Account[];

  @OneToMany(type => MyAccount, myAccount => myAccount.user)
  myAccount!: MyAccount[];
}