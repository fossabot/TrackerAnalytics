import express from "express";
import selectEvents from "./sessions/select";
const router = express.Router();

router.use('/sessions',selectEvents);

export default router;