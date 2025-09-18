import cors from 'cors';
import express from 'express';
import routes from './routes/index.js'; // router principal
const app = express();
// CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Request-With', 'Content-Type', 'Accept'],
}));
// Permitir JSON no body
app.use(express.json());
// Registrar todas as rotas com prefixo /api
app.use('/api', routes);
export default app;
