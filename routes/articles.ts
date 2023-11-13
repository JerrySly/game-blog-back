import express, { Request, Response, Router } from "express";
import { calculatePageMeta, createArticle, deleteArticle, editArticle, getArticle, getArticles, setHiddenStatus } from "../services/articles.service";
import { PageRequest } from "../types/page";
import { validate } from 'uuid';

export const articleRouter = express.Router();

articleRouter.post('/', (req: Request, res: Response): void => {
  const { body } = req;
  try {
    createArticle(body).then(data => {
      res.status(200).send(data);
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('Error on back');
  }
})

articleRouter.get('/',  (req: Request, res: Response) => {
  const { query } = req;
  const pageRequest: PageRequest = {
    pageNumber: Number.parseInt(query.page as string, 10) as number,
    amount: Number.parseInt(query.amount as string, 10) as number,
  }
  if (query?.search) {
    pageRequest.search = query.search as string;
  }
  getArticles(pageRequest).then(data => {
    const meta = calculatePageMeta(pageRequest, data.count);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify( {
      data,
      meta,
    }));
    res.end();
  })
})
const getArticleCallBack = (req: Request, res: Response) => {
  const { params } = req;
  let identifier: string | number;
  console.log(params);
  identifier = validate(params.idOrUuid) ? params.idOrUuid : Number.parseInt(params.idOrUuid, 10);  
  console.log('id', identifier);
  getArticle(identifier).then(data => {
    res.status(200).send(data);
    res.end();
  })
}
articleRouter.get('/:idOrUuid', getArticleCallBack);

articleRouter.put('/:uuid', (req: Request, res: Response) => {
  const { body } = req;
  editArticle(body).then(data => {
    res.status(200).send(data);
    res.end();
  })
})

articleRouter.put('/hidden/:uuid', (req: Request, res: Response) => {
  const { params, body } = req;
  setHiddenStatus(body.value, params.uuid).then(data => {
    res.status(200).send(data);
    res.end();
  });
})

articleRouter.delete('/:uuid', (req: Request, res: Response) => {
  const { params } = req;
  if (!params?.uuid) res.status(404).json({
    message: 'uuid is empty or unvalid'
  })
  deleteArticle(params.uuid).then( result => {
    res.status(200).send(result);
  })
})