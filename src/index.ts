import express from 'express';
import { formatRoute } from './routes/format';

const app = express();
const port = 3000;

app.get('/format/money/:input', formatRoute);

app.listen(port, () =>
  console.log(`Pleo money formatter listening on port ${port}!`),
);
