import express from "express";
import multer from "multer";
import path from 'path'
import { fileURLToPath } from "url";
import cors from 'cors';

const app = express();

const __fileName = fileURLToPath(import.meta.url)
const __dirName =  path.dirname(__fileName)

app.use(express.static(path.join(__dirName,'./uploads')))
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{  // where to copy the files 
     cb(null,"./uploads");
    },
    filename :(req,file,cb)=>{
      cb(null,Date.now() +"-"+ file.originalname);
    }
});

const uploadFile = multer({storage: storage})

// router  for upload 
app.post('/upload' ,uploadFile.single('avatar') ,(req,res)=>{
   console.log("test");
   console.log(req.file.filename);
   res.json({message:'image uploaded!!!'})
  })
  app.get('/upload',(req ,res) =>{
   res.render("upload");
  });


app.listen(3000, ()=>{
    console.log(' server start on port 3000!');
})
