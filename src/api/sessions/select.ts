import express, { Request, Response, Next } from "express";
import db from "./../../db";
const router = express.Router();

router.get('/', (req: Request, res: Response, _next: Next) =>
{
    let _SQL = `SELECT * FROM sessions
            WHERE fingerprint='${req.query.fingerprint || null}'
            ORDER BY session_id DESC
            LIMIT ${req.query.limit || -1}
            OFFSET ${req.query.offset || 0}`;

    if(req.query.session)
    {
        _SQL = `SELECT * FROM sessions
            WHERE session='${req.query.session || null}' AND fingerprint='${req.query.fingerprint || null}'
            ORDER BY session_id DESC
            LIMIT ${req.query.limit || -1}
            OFFSET ${req.query.offset || 0}`;
    }

    db.serialize(()=> {
        db.all(_SQL, [], (err, rows) => {
            if (err) {
                console.log(err);
            }
            if (rows && rows.length !== 0) {
                res.status(200).json({
                    code: 200,
                    message: 'Success',
                    isSuccess: true,
                    data: rows
                });
            } else {
                res.status(500).json({
                    code: 500,
                    message: 'there is no data',
                    isSuccess: false,
                    data: []
                }).end();
            }
        });
    })
});

export default router;