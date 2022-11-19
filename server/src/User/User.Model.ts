import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name?: string;

  @Column({
    type: "text",
    nullable: true,
  })
  refresh_token?: string | null;

  static findOneByName(userName: string) {
    return this.createQueryBuilder("user").where("user.Name = :userName", { userName }).getOne();
  }

  static findOneByID(userID: number) {
    return this.createQueryBuilder("user").where("user.id = :userID", { userID }).getOne();
  }
}
