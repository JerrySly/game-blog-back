import express, { Request, Response} from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import './database';
import { articleRouter } from './routes/articles';
import { createLogger, loggerInstance } from './utils/logger';
import imageRouter from './routes/images';
import { existsSync } from 'fs';
import path from 'path';
import { error } from 'console';
dotenv.config();

const app = express();
const port = process.env.PORT;
createLogger();

const corsOption: CorsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOption));
app.use(express.json());
app.use('/image', express.static('images', {
  fallthrough: true,
}))
app.use('/article', articleRouter)
app.use('/images', imageRouter)
app.use((req: Request, res: Response) => {
  res.status(200).send('Page not found');
})



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  loggerInstance.info('Server started');
});