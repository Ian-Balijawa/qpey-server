import express, { Request, Response } from "express";
import { AuthenticatedMiddleware as requireAuth } from "../../middlewares/require-auth";
import { sendSMS } from "../../services/notification";

const router = express.Router();

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const { message, toNo } = req.body;

  const msg = await sendSMS(message, toNo);
  res.send(msg);
});

export { router as smsRouter };
