import cors from 'cors';
import express from 'express';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Request-with', 'Content-type', 'Accept'],
  }),
);

app.use(express.json());

export default app;
