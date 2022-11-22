import express, { Request, Response } from "express";
import userRouter from "../User/User.Router";
import formRouter from "../Form/Form.Routes";
import resultRouter from "../Result/Result.Router";

import responseRouter from "../Response/Response.Routes";

const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

router.use("/api/users", userRouter);

router.use("/api/forms", formRouter);

router.use("/api/results", resultRouter);

router.use("/api/responses", responseRouter);
export default router;
