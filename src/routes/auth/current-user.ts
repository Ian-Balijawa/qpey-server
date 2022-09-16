import express, { Request, Response } from "express";
import { AuthenticatedMiddleware } from "../../middlewares/require-auth";

const router = express.Router();

router.get("/", AuthenticatedMiddleware, (req: Request, res: Response) => {
  console.log("currentuser: ", req.currentUser);
  return res.status(200).send(req.currentUser || null);
});

export { router as currentUserRouter };
