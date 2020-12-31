import express, {Request, Response} from "express";
import api from "./api/router";
import fetch from "node-fetch";
const router = express.Router();

router.use('/api',api);

router.use('/play', (req:Request, res:Response) => {
    const f = req.query.fingerprint || "";
    const l = req.query.limit || -1;
    const o = req.query.offset || 0;
    const s = req.query.session || "";

    const homeUrl = `http://${process.env.APP}:${process.env.PORT}`;
    const API     = `/api/sessions?fingerprint=${encodeURI(f)}&session=${encodeURI(s)}&limit=${encodeURI(l)}&offset=${encodeURI(o)}`;

    fetch(`${homeUrl}${API}`,{
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then((data) => {

            let sessions = JSON.stringify([]);

            if((JSON.stringify(data)).toString())
            {
                sessions = (JSON.stringify(data)).toString();
            }

            // @ts-ignore
            res.render('play', {
                sessions: escape(sessions.toString()),
                homeUrl: homeUrl.toString(),
            });
        }
    );
});

export default router;