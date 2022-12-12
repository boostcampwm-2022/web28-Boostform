/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./User.Model";
import app from "../app";

dotenv.config();

const testUser = {
  name: "testUser",
  id: 58,
  infAccessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsImlhdCI6MTY3MDgyODE2MH0.vQrK4E6RbQfPxpTt0cjBmhYVtlihWJelKSdssm2W45E",
  infRefreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsImlhdCI6MTY3MDgyODE2NH0.07bukMgpAcfDik8Umlg2UtTvVKmWFotf3AHy_legMWs",
};

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

// 로그인 처리
beforeEach(async () => {
  const targetUser = await User.findOneByID(testUser.id);
  if (targetUser === null) throw new Error("mock invalid");
  targetUser.refresh_token = testUser.infRefreshToken;
  await targetUser.save();
});

// 본인 유저 정보
describe("GET api/users", () => {
  test("로그인한 유저의 경우 유저 정보 반환", (done) => {
    request(app)
      .get("/api/users")
      .set("Cookie", [`accessToken=${testUser.infAccessToken}`, `refreshToken=${testUser.infRefreshToken}`])
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ userID: testUser.id, userName: testUser.name });
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

describe("DELETE /api/users/logout", () => {
  test("로그인한 유저의 경우 로그아웃 처리", (done) => {
    request(app)
      .delete("/api/users/logout")
      .set("Cookie", [`accessToken=${testUser.infAccessToken}`, `refreshToken=${testUser.infRefreshToken}`])
      .expect(204)
      .expect(
        "set-cookie",
        "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT,refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
      )
      .then((res) => done())
      .catch((err) => {
        console.error("######Error >>", err);
        done(err);
      });
  });

  test("인증 불가 유저의 로그아웃 요청시 401에러 반환", (done) => {
    request(app)
      .delete("/api/users/logout")
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
