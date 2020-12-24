// tslint:disable-next-line:no-var-requires
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// TODO: DB Table Generator
db.serialize(()=> {
    db.run(`
        CREATE TABLE IF NOT EXISTS events (
            event_id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            trace TEXT NOT NULL,
            name TEXT NULL,
            X INTEGER,
            Y INTEGER,
            currentX INTEGER,
            currentY INTEGER,
            screenWidth INTEGER,
            screenHeight INTEGER,
            touchPoints INTEGER,
            timestamp INTEGER,
            platform TEXT,
            userAgent TEXT,
            target TEXT,
            key TEXT
        );
    `);
});

export default db;