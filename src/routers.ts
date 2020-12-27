import express, { Request, Response } from "express";
import api from "./api/router";
import fetch from "node-fetch";
const router = express.Router();

router.use('/api',api);

router.use('/embeed', (req:Request, res:Response) => {
    const f = req.query.fingerprint || "";
    const l = req.query.limit || -1;
    const o = req.query.offset || 0;
    const s = req.query.session || "";
    const url = `/api/sessions?fingerprint=${encodeURI(f)}&session=${encodeURI(s)}&limit=${encodeURI(l)}&offset=${encodeURI(o)}`;

    res.render('embeed', {
        url,
        homeUrl:`http://${process.env.APP}:${process.env.PORT}`
    });
});
export default router;