import axios from "axios";
import tokens from "./types/tokens.inteface";
import jwt from "jsonwebtoken";

class UserService {
  #redirectURL;

  #githubAccessToken;

  constructor() {
    this.#redirectURL = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`;
    this.#githubAccessToken = "";
  }

  get redirectURL() {
    return this.#redirectURL;
  }

  async issueGithubAccessToken(code: string): Promise<void> {
    const opts = { headers: { accept: "application/json" } };
    const body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    };
    this.#githubAccessToken = await axios
      .post(`https://github.com/login/oauth/access_token`, body, opts)
      .then(async (res) => {
        return res.data.access_token;
      })
      .catch((err) => {
        throw err;
      });
  }

  async getGithubUserName(): Promise<string> {
    const userName = await axios
      .get(`https://api.github.com/user`, {
        headers: { Authorization: `Bearer ${this.#githubAccessToken}` },
      })
      .then(async (res) => {
        return res.data.login;
      })
      .catch((err) => {
        throw err;
      });
    return userName;
  }

  async login(code: string): Promise<tokens> {
    this.issueGithubAccessToken(code);
    const uesrName = this.getGithubUserName();
    // TODO: userName으로 DB에서 user 조회
    // TODO: 조회한 user값이 없으면 가입 처리 signUp(userName)
    // TODO: userID값으로 토큰 생성
  }
}

export default new UserService();
