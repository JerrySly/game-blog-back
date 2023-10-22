import express, { Request, Response, Router } from "express";
import { createArticle, getArticles } from "../services/articles.service";

export const articleRouter = express.Router();

articleRouter.post('/', (req: Request, res: Response) => {
  const { body } = req;
  try {
    createArticle(body);
    res.status(200).send(body);
  } catch (e) {
    res.status(500).send('Error on back');
  }
})

articleRouter.get('/', async (req: Request, res: Response) => {
  const { query } = req;
  console.log(query);
  const articlesList = await getArticles({
    pageNumber: Number.parseInt(query.page as string, 10) as number,
    amount: Number.parseInt(query.amount as string, 10) as number,
  })
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(articlesList));
  res.end();
})