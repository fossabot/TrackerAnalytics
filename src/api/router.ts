import express, { Request, Response, Next } from "express";
const router = express.Router();

router.get('/', (_req: Request, res: Response, _next: Next) =>
{
  res.status(200)
    .json(null);
})

export default router;