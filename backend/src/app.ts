import 'dotenv/config';

import express, { Request } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import errorHandler from './middlewares/error-handler';
import { DB_ADDRESS } from './config';
import routes from './routes';
import cors, {CorsOptions} from 'cors';
const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);

// Только для локальных тестов. Не используйте это в продакшене
const allowlist = ['http://mesto.gyxer.com', 'https://mesto.gyxer.com'];
const corsOptionsDelegate = (
  req: Request,
  callback: (error: Error | null, corsOptions?: CorsOptions) => void,
) => {
  const corsOptions = { origin: false };
  const header = req.header('Origin');

  if (header !== undefined && allowlist.indexOf(header) !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('server is running'));
