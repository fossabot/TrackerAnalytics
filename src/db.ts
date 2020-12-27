// tslint:disable-next-line:no-var-requires
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// TODO: DB Table Generator
db.serialize(()=> {
    db.run(`
        CREATE TABLE IF NOT EXISTS sessions (
            session_id INTEGER PRIMARY KEY AUTOINCREMENT,
            session TEXT NOT NULL,
            timestamp INTEGER ,
            fingerprint TEXT,
            resolution TEXT,
            userAgent TEXT,
            browser TEXT,
            browserVersion TEXT,
            engine TEXT,
            engineVersion TEXT,
            os TEXT,
            osVersion TEXT,
            cpu TEXT,
            isMobileAndroid TEXT,
            isMobileIOS TEXT,
            isMobile TEXT,
            eventDataJSON TEXT
        );
    `);
});

export default db;