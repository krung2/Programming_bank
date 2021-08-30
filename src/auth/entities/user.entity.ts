import { Column, PrimaryColumn, Entity, OneToOne, OneToMany } from "typeorm";
import Authentication from "./authentication.entity";

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
}