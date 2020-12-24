import app from "./service";

const port     = process.env.PORT;
const hostname = process.env.APP;

app.listen(port,hostname, () => {
  // tslint:disable-next-line:no-console
  console.log(`@eminmuhammadi/TrackerAnalytics listening at http://${hostname}:${port}`);
});