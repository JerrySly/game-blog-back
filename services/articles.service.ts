import { error } from 'console';
import { PageRequest, PagesMeta, PageResponse } from './../types/page.d';
import { Article } from './../database/models';
import { loggerInstance } from '../utils/logger';
import { FindAndCountOptions, Model, Op, WhereOptions } from 'sequelize';

type ArticleCreateModel = {
  mainPicture: string;
  startText: string;
  mainText: string;
  title: string;
}

type SimpleArticleModel = Omit<Article, keyof Model>;

interface ArticlePageRequest extends PageRequest {
}

export const editArticle = async (article: SimpleArticleModel): Promise<boolean> => {
  try {
    let entity = await getArticle(article.uuid);
    console.log(article);
    Article.update({
        ...article
    }, {
      where: {
        uuid: article.uuid,
      }
    })
  } catch (e) {
    console.log(e);
    loggerInstance.error(e);
    return false;
  }
  return true;
}

export const deleteArticle = async (uuid: String): Promise<Boolean> => {
  try {
    const result = await Article.destroy({
      where: {
        uuid
      }
    })
  }
  catch (error) {
    loggerInstance.error(`action: deleteArticle, uuid=${uuid}, message=${error}`);
    return false;
  }
  return true
}

export const setHiddenStatus = async (value: Boolean, uuid: String) => {
  const result = await Article.update({
    'isHidden': value,
  }, {
    where: {
      uuid,
    }
  })
  return result;
}

export const calculatePageMeta = (request: PageRequest, count: number): PagesMeta => {
  const pages = count / request.amount;
  const left = count - request.amount * request.pageNumber;
  const meta: PagesMeta = {
    leftCount: left > 0 ? left : 0,
    prevPage: request.pageNumber >= 2 ? request.pageNumber - 1 : null,
    nextPage: pages > request.pageNumber ? request.pageNumber + 1 : null, 
  } 
  return meta;
}



export const createArticle = async (newArticle: ArticleCreateModel) => {
  const article = Article.build({
    ...newArticle,
  })
  return await article.save();
};

export const getArticles = async (request: ArticlePageRequest): Promise<PageResponse<Article>> => {
  const seqRequest: FindAndCountOptions = {
    limit: request.amount,
    offset: (request.pageNumber - 1) * request.amount,
  }
  seqRequest.order = [
    ['createdAt', 'DESC']
  ];
  if (request.search) {
    seqRequest.where = {
      title: {
        [Op.substring]: request.search
      }
    }
  }
  console.log('S', seqRequest);
  const data = await Article.findAndCountAll(seqRequest);
  return data;
}

export const getArticle = async (identifier: number | string): Promise<Article> => {
  const whereOptions: WhereOptions<Article> = {
    
  }
  if (typeof identifier === 'string') {
    whereOptions.uuid = identifier; 
  } else {
    whereOptions.id = identifier;
  }
  const result = (await Article.findOne({
    where: whereOptions,
  }));
  if (!result) {
    throw Error('No entity');
  }
  return result?.dataValues;
}