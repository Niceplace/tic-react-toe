import express from 'express';
import { join } from 'path';
import { formatRoute } from '../routes/format';
import { homepageRoute } from '../routes/homepage';

const app = express();

app.use('/static', express.static(join(__dirname, '../public')));
app.get('/format/money/:input', formatRoute);
app.get('/', homepageRoute);

export default app;
