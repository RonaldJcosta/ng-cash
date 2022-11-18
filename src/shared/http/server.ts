import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import AppError from '@shared/errors/AppError';
import { dataSource } from '../infra/typeorm/';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    return response
      .status(500)
      .json({ status: 'error', message: `Internal Server Error` });
  },
);

dataSource
  .initialize()
  .then(() => console.log(`DataSource foi inicializado.`))
  .catch(err => console.error(`Houve um error no DataSource`, err));

app.listen(3333, () => console.log(`Server is running http://localhost:3333`));
