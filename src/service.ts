/// <reference types="node" />
import express, { Request, Response, Next } from "express";
import routers from "./routers";
import compression from "compression";
import timeout from "connect-timeout";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import winston from "winston";
import expressWinston from "express-winston";
import helmet from "helmet";
import cors from "cors";
import ErrorHandler from "api-error-handler";
import fs from "fs";

// tslint:disable-next-line:no-var-requires
const socketIoInit = require('socket.io');

const app = express();
// tslint:disable-next-line:no-var-requires
const server = require('http').createServer(app);
const io = socketIoInit(server, {
  handlePreflightRequest: (req:Request, res:Response) => {
    res.writeHead(200, {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin,
      "Access-Control-Allow-Credentials": true
    });
    res.end();
  },
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true
  }
});

/**
 * Configuration
 */
dotenv.config({ path: path.join(__dirname, './../.env') });
app.disable('x-powered-by');
app.set('json spaces', 40);
app.use(timeout('60s'));
app.use(cors());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ErrorHandler());
/**
 * Loggers
 */
app.use(morgan('combined'));
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, './../log/error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(__dirname, './../log/combined.log') })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: "{{res.statusCode}} HTTP {{req.method}} {{res.responseTime}}ms {{req.url}}",
  expressFormat: true,
  colorize: false
}));

/**
 * Routers
 */
app.use('/', routers);
/**
 * Storage
 */
app.use(express.static(path.join(__dirname, './../public')));

/**
 * TrackerAnalytics Engine
 */
app.engine('TrackerAnalytics',  (filePath, options, callback) =>
{
  fs.readFile(filePath,  (err, content) =>
  {
    if (err) return callback(err);
    let rendered = content.toString();

    Object.entries(options).forEach(([key,value]) =>
    {
      if (typeof value === 'string')
      {
        rendered = rendered.replace(`{{%${key}%}}`,  value)
      }
    });

    rendered = ''+rendered.replace(/ +(?= )/g,'');
    rendered = rendered.replace(/\s{2,}/g, ' ');

    return callback(null, rendered)
  })
});

app.set('views', path.join(__dirname, './../views'));
app.set('view engine', 'TrackerAnalytics');
/**
 * Timeout Error
 */
app.use((req: Request, _res: Response, next: Next)=> { if (!req.timedout) next() });

export { server, app, io }