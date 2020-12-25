import express from "express";
import api from "./api/router";
const router = express.Router();

router.use('/api',api);

export default router;