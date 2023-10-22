import express, { Request, Response} from 'express';
import dotenv from 'dotenv';
import './database';
import { articleRouter } from './routes/articles';
import { createLogger, loggerInstance } from './utils/logger';
import imageRouter from './routes/images';
dotenv.config();

const app = express();
const port = process.env.PORT;
createLogger();

app.use(express.json());
app.use('/article', articleRouter)
app.use('/images', imageRouter)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  loggerInstance.info('Server started');
});