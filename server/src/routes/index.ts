import express, { Request, Response } from "express";
import formRouter from "../Form/Form.Routes.Mock";

const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

router.use("/api/Forms", formRouter);

export default router;
