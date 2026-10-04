import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { usersRouter, notesRouter, authRouter } from './routes';

import { sleep } from './sleep.js';

const server = express();

server.listen(4000, () => {
  console.log('Server started on port 4000');
});

server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

server.use(json(), cookieParser(), sleep([400, 1500]));

server.use('/users', usersRouter);

server.use('/notes', notesRouter);

server.use('/', authRouter);

