import express from "express";
import selectEvents from "./events/select";
const router = express.Router();

router.use('/events',selectEvents);

export default router;