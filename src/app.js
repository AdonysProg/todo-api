import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pkg from '../package.json';
import noteRoute from './routes/note.routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(morgan('dev'));

app.set('pkg', pkg);
app.get('/api/', (req, res) => {
  res.send({
    author: app.get('pkg').author,
    name: app.get('pkg').name,
    version: app.get('pkg').version,
    description: app.get('pkg').description,
  });
});

app.use('/api/note', noteRoute);

export default app;
