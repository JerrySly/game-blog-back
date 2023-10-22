import { Article } from "../database/models"
import { PageRequest } from "../types/page";

type ArticleCreateModel = {
  mainPicture: string;
  startText: string;
  mainText: string;
  title: string;
}

interface ArticlePageRequest extends PageRequest {

}

export const createArticle = (newArticle: ArticleCreateModel) => {
  const article = Article.build({
    ...newArticle,
  })
  article.save();
};

export const getArticles = async (request: ArticlePageRequest): Promise<Article[]> => {
  const data = await Article.findAll({
    limit: request.amount,
    offset: (request.pageNumber - 1) * request.amount
  });
  console.log(data);
  return data;
}