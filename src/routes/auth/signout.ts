import express, { Response, Request } from "express";
import { AuthenticatedMiddleware as requireAuth } from "../../middlewares/require-auth";

const router = express.Router();

router.post("/", requireAuth,(req: Request, res: Response) => {
  (req.session as any) = null;
  return res.send({ message: "user session destroyed" });
});

export { router as signoutRouter };
