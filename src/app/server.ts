import express from 'express';
import { formatRoute } from '../routes/format';

const app = express();

app.get('/format/money/:input', formatRoute);

export default app;
