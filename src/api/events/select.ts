import express, { Request, Response, Next } from "express";
import db from "./../../db";
const router = express.Router();

router.get('/', (req: Request, res: Response, _next: Next) =>
{

    let _SQL = `SELECT * from events ORDER BY event_id DESC LIMIT 1 OFFSET 0`;

    if(!req.query.trace)
    {
        res.status(500).json({
            code: 500,
            message: 'trace param is required',
            isSuccess: false,
            data: []
        }).end();
    }

    if(req.query.trace)
    {
        _SQL = `SELECT * FROM events
            WHERE trace='${req.query.trace}'
            ORDER BY event_id DESC`;
    }

    if(req.query.trace && req.query.name)
    {
        _SQL = `SELECT * FROM events
            WHERE trace='${req.query.trace}' AND name='${req.query.name}'
            ORDER BY event_id DESC`;
    }

    if(req.query.trace && req.query.name && req.query.limit)
    {
        _SQL = `SELECT * FROM events
            WHERE trace='${req.query.trace}' AND name='${req.query.name}'
            ORDER BY event_id DESC
            LIMIT ${req.query.limit}`;
    }

    if(req.query.trace && req.query.name && req.query.limit && req.query.offset)
    {
        _SQL = `SELECT * FROM events
            WHERE trace='${req.query.trace}' AND name='${req.query.name}'
            ORDER BY event_id DESC
            LIMIT ${req.query.limit}
            OFFSET ${req.query.offset}`;
    }
    db.serialize(()=> {
        db.all(_SQL, [], (err, rows) => {
            if (err) {
                console.log(err);
            }
            if (rows.length !== 0) {
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