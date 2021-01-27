import app from './app';
import { config } from 'dotenv';
import './database';
config();

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}`);
