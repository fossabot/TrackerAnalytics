import { server, io } from "./service";
import { Socket } from "socket.io";
import db from './db';

const port     = process.env.PORT;
const hostname = process.env.APP;

/**
 * Socket
 */
io.on('connection', (socket:Socket) => {
  socket.on('CreateSession', (data) => {
    db.run(`
        INSERT INTO sessions (
            session,
            timestamp,
            fingerprint,
            resolution,
            userAgent,
            browser,
            browserVersion,
            engine,
            engineVersion,
            os,
            osVersion,
            cpu,
            isMobileAndroid,
            isMobileIOS,
            isMobile,
            eventDataJSON
        )
        VALUES('${data.session}','${data.timestamp}','${data.fingerprint}','${data.resolution}','${data.userAgent}',
            '${data.browser}','${data.browserVersion}','${data.engine}','${data.engineVersion}','${data.os}',
            '${data.osVersion}','${data.cpu}','${data.isMobileAndroid}','${data.isMobileIOS}','${data.isMobile}',
            '${data.eventDataJSON}');`,
        (err => {
          if(err)
          {
            console.log(err)
          }
    }))
  });
});

server.listen(port, hostname, () => {
  // tslint:disable-next-line:no-console
  console.log(`@eminmuhammadi/TrackerAnalytics listening at ${hostname}:${port}`);
});