import express, { Request, Response } from "express";
import userRouter from "../User/User.Router";
import formRouter from "../Form/Form.Routes";
import boardRouter from "../Board/Board.Routes";

const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

router.use("/api/users", userRouter);

router.use("/api/forms", formRouter);

router.use("/api/board", boardRouter);

export default router;
