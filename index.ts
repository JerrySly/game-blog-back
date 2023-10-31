import express, { Request, Response} from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import './database';
import { articleRouter } from './routes/articles';
import { createLogger, loggerInstance } from './utils/logger';
import imageRouter from './routes/images';
import { existsSync, readFile } from 'fs';
import path from 'path';
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
app.use('/article', articleRouter)
app.use('/images', imageRouter)
// app.use('/image', express.static('images', {
//   fallthrough: true,
// }))


app.use('/image', function (req: Request, res: Response, next: any) {
  let array = req.originalUrl.split("/");
  const filePath = path.join(__dirname,'..', `images/${array[array.length - 1]}`);
  console.log(array, filePath);
  if (!existsSync(filePath)) {
    res.send('Not found');
    return;
  }
  return next();
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  loggerInstance.info('Server started');
});