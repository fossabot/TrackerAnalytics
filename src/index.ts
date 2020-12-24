import { server, io } from "./service";
import { Socket } from "socket.io";

const port     = process.env.PORT;
const hostname = process.env.APP;

server.on('error', (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') throw error
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
})

/**
 * Socket
 */
io.on('connection', (socket:Socket) => {
  socket.on('analytics', (data) => {
    console.log(data);
  });
});

server.listen(port, hostname, () => {
  // tslint:disable-next-line:no-console
  console.log(`@eminmuhammadi/TrackerAnalytics listening at http://${hostname}:${port}`);
});