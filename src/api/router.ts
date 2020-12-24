import express from "express";
const router = express.Router();

router.get('/', (_req, res, _next) => {
  res.status(200)
    .json(null);
})

export default router;