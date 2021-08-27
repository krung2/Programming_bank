import { Column, PrimaryColumn, Entity, OneToOne } from "typeorm";
import Authentication from "./authentication.entity";

@Entity('user')
export default class User {

  @PrimaryColumn()
  phone!: string;

  @Column({
    unique: true,
  })
  id: string;

  @Column()
  pw: string;

  @Column()
  name: string;

  @Column()
  birth: string;

  @OneToOne(type => Authentication, authentication => authentication.user)
  authentication!: Authentication | null;
}