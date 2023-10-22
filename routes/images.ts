import express, { Request, Response, Router } from "express";
import upload from "../utils/multer";

const imageRouter = express.Router();

imageRouter.post('/single', upload.single('image'), (req: Request, res: Response) => {
  if (req.file) {
    res.status(200).send('Success')
  } else {
    res.status(400).send('Invalid image file')
  }
})

imageRouter.post('/multiple', upload.array('images'), (req: Request, res: Response) => {
  if (req.file) {
    res.status(200).send('Success')
  } else {
    res.status(400).send('Invalid image files')
  }
})

export default imageRouter;
