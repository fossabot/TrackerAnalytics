import express, { Request, Response, Next } from "express";
import db from "./../../db";
const router = express.Router();

router.get('/', (req: Request, res: Response, _next: Next) =>
{
    const isEmpty = (value) => {
        // tslint:disable-next-line:prefer-const only-arrow-functions
        let isEmptyObject = function(a) {
            if (typeof a.length === 'undefined') { // it's an Object, not an Array
                // tslint:disable-next-line:prefer-const
                let hasNonempty = Object.keys(a).some(function nonEmpty(element){
                    return !isEmpty(a[element]);
                });
                return hasNonempty ? false : isEmptyObject(Object.keys(a));
            }

            return !a.some(function nonEmpty(element) {
                return !isEmpty(element);
            });
        };
        return (
            // tslint:disable-next-line:triple-equals
            value == false
            || typeof value === 'undefined'
            || value == null
            || (typeof value === 'object' && isEmptyObject(value))
        );
    };

    let _SQL = `SELECT * from sessions ORDER BY session_id DESC LIMIT -1 OFFSET 0`;

    if(isEmpty(req.query.fingerprint) || !req.query.fingerprint)
    {
        res.status(500).json({
            code: 500,
            message: 'fingerprint param is required',
            isSuccess: false,
            data: []
        }).end();
    }

    if(req.query.fingerprint)
    {
        _SQL = `SELECT * FROM sessions
            WHERE fingerprint='${encodeURI(req.query.fingerprint)}'
            ORDER BY session_id DESC
            LIMIT ${encodeURI(req.query.limit) || -1}
            OFFSET ${encodeURI(req.query.offset) || 0}`;
    }

    if(req.query.session && req.query.fingerprint)
    {
        if(isEmpty(req.query.session))
        {
            res.status(500).json({
                code: 500,
                message: 'session param is required',
                isSuccess: false,
                data: []
            }).end();
        }
        _SQL = `SELECT * FROM sessions
            WHERE session='${encodeURI(req.query.session)}' AND fingerprint='${encodeURI(req.query.fingerprint)}'
            ORDER BY session_id DESC
            LIMIT ${encodeURI(req.query.limit) || -1}
            OFFSET ${encodeURI(req.query.offset) || 0}`;
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