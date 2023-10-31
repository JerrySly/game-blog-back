import express, { Request, Response, Router } from "express";
import upload from "../utils/multer";
import path from "path";
import { readFile } from "fs";

const imageRouter = express.Router();

imageRouter.post('/single', upload.single('image'), (req: Request, res: Response) => {
  if (req.file) {
    res.status(200).send('Success')
  } else {
    res.status(400).send('Invalid image file')
  }
})

imageRouter.post('/multiple', upload.array('images'), (req: Request, res: Response) => {
  if (req.files) {
    res.status(200).send('Success')
  } else {
    res.status(400).send('Invalid image files')
  }
})


// imageRouter.get('/image/:fileName', (req: Request, res: Response) => {
//   console.log(req.params, req.query, path.extname(req.params.fileName));
//   if (!path.extname(req.params.fileName)) { res.status(404); return;}
//   const filePath = path.join(__dirname,`../../images/${req.params.fileName}`);
//   console.log(filePath);
//   readFile(filePath, (er, data) => {
//     if (er || !data) {
//       res.status(500);
//     }
//     console.log('data', data);
//     if (data) {
//       res.set({'Content-Type': 'image/png'});
//       res.write(data, 'binary');
//       res.end(null, 'binary');
//     } 
//   }, )
// })

export default imageRouter;
