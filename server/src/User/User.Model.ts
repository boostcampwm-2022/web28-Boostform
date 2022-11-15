import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name?: string;

  @Column()
  refresh_token?: string;

  static findOneByName(userName: string) {
    return this.createQueryBuilder("user").where("user.Name = :userName", { userName }).getOne();
  }
}
