import express from 'express';
import morgan from 'morgan';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// custom middleware
app.use(async (req, res, next) => {
  req.sssss_secret = 'some secret';
  next();
});

app.get('/', (req, res) => {
  console.log('hello from express');
  res.status(200);
  res.json({ message: 'hello' });
});

app.use('/user', createNewUser);
app.use('/signin', signin);
app.use('/api', protect, router);

export default app;
