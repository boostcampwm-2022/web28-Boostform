/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./User.Model";
import app from "../app";

dotenv.config();

beforeAll(async () => {
  const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.TYPEORM_HOST || "",
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME || "",
    password: process.env.TYPEORM_PASSWORD || "",
    database: process.env.TYPEORM_DATABASE || "",
    entities: [User],
  });
  await myDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
  });
});

// 본인 유저 정보
describe("GET api/users", () => {
  const testUserName = "testUser";
  const testUserId = 58;
  const testUserAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsImlhdCI6MTY3MDgyODE2MH0.vQrK4E6RbQfPxpTt0cjBmhYVtlihWJelKSdssm2W45E";
  const testUserRefreshToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsImlhdCI6MTY3MDgyODE2NH0.07bukMgpAcfDik8Umlg2UtTvVKmWFotf3AHy_legMWs";
  test("로그인한 유저의 경우 유저 정보 반환", (done) => {
    request(app)
      .get("/api/users")
      .set("Cookie", [`accessToken=${testUserAccessToken}`, `refreshToken=${testUserRefreshToken}`])
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ userID: testUserId, userName: testUserName });
        done();
      })
      .catch((err) => {
        console.error("######Error >>", err);
        done(err);
      });
  });

  test("로그인 안한 유저의 경우 401에러 반환", (done) => {
    request(app)
      .get("/api/users")
      .expect(401)
      .then((res) => {
        expect(res.body).toEqual({ status: 401, message: "Empty AccessToken" });
        done();
      })
      .catch((err) => {
        console.error("######Error >>", err);
        done(err);
      });
  });
});
