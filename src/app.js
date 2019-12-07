import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(morgan('dev'));
export default app;
