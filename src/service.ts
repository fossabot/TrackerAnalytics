import express from "express";
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

const app = express();

/**
 * Configuration
 */
dotenv.config({ path: path.join(__dirname, './../.env') });
app.disable('x-powered-by');
app.set('json spaces', 40);
app.use(timeout('60s'));
app.use(cors());
app.use(helmet());
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
app.use('/', routers)

/**
 * Storage
 */
app.use(express.static(path.join(__dirname, './../public')));

/**
 * Timeout Error
 */
app.use((req,_res,next)=> { if (!req.timedout) next() });

export default app