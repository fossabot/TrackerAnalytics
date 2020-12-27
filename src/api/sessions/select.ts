import express, { Request, Response, Next } from "express";
import db from "./../../db";
const router = express.Router();

router.get('/', (req: Request, res: Response, _next: Next) =>
{

    let _SQL = `SELECT * from sessions ORDER BY session_id DESC LIMIT 1 OFFSET 0`;

    if(!req.query.fingerprint)
    {
        res.status(500).json({
            code: 500,
            message: 'fingerprint param is required',
            isSuccess: false,
            data: []
        }).end();
    }

    if(req.query.fingerprint && req.query.limit && req.query.offset)
    {
        _SQL = `SELECT * FROM sessions
            WHERE fingerprint='${req.query.fingerprint}'
            ORDER BY session_id DESC
            LIMIT ${req.query.limit}
            OFFSET ${req.query.offset}`;
    }

    if(req.query.session && req.query.fingerprint && req.query.limit && req.query.offset)
    {
        _SQL = `SELECT * FROM sessions
            WHERE session='${req.query.session}' AND fingerprint='${req.query.fingerprint}'
            ORDER BY session_id DESC
            LIMIT ${req.query.limit}
            OFFSET ${req.query.offset}`;
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