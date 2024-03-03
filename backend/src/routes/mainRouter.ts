import { Hono } from "hono";
import userRouter from "./userRouter";
import blogRouter from "./blogRouter";

const mainRouter = new Hono();

mainRouter.route("/user", userRouter);
mainRouter.route("/blog", blogRouter);

export default mainRouter;