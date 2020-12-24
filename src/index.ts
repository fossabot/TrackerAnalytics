import { server, io } from "./service";
import { Socket } from "socket.io";
import db from './db';

const port     = process.env.PORT;
const hostname = process.env.APP;

/**
 * Socket
 */
io.on('connection', (socket:Socket) => {
  socket.on('analytics', (data) => {
    // TODO: Insert to the db
    db.run(`
        INSERT INTO events (
            url,
            trace,
            name,
            X,
            Y,
            currentX,
            currentY,
            screenWidth,
            screenHeight,
            touchPoints,
            timestamp,
            platform,
            userAgent,
            target,
            key
        )
        VALUES('${data.targetUrl}', '${data.trace}', '${data.event}', '${data.X}', '${data.Y}', '${data.currentX}',
        '${data.currentY}', '${data.screenWidth}', '${data.screenHeight}', '${data.touchPoints}', '${data.timestamp}',
        '${data.platform}', '${data.userAgent}', '${data.target}', '${data.key}');
    `, (err => {
      if(err){
        console.log(err)
      }
    }))
  });
});

server.listen(port, hostname, () => {
  // tslint:disable-next-line:no-console
  console.log(`@eminmuhammadi/TrackerAnalytics listening at http://${hostname}:${port}`);
});