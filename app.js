import express from 'express';
import bodyParser from 'body-parser';

import authorization from './auth';
import config from './config/config';
import datasource from './config/datasource';

// Routes
import authRouter from './routes/auth.routes';
import booksRouter from './routes/books.routes';
import usersRouter from './routes/users.routes';

const app = express();

app.config = config;
app.datasource = datasource(app);

const auth = authorization(app);

app.set('port', 3000);
app.use(bodyParser.json());
app.use(auth.initialize());

app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;