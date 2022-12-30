import {generatePdf} from 'html-pdf-node';
import { readFile, writeFile} from 'fs'
import { promisify } from 'util';
import * as path from 'path';
import express from 'express';
import { Request, Response } from 'express';
const readFileAsync = promisify(readFile);

let options = {format : 'A4'};

const generatePdfs = async (title:string|undefined) => {

    let content = await readFileAsync(path.resolve(__dirname,'index.html'),'utf8');
    const image = await readFileAsync(path.resolve(__dirname,'placeholder-circle.png'),'base64');
    content = content.replace('{title}',title || 'No Title').replace('{image1}',image);
    const file = {
        content
    }

    const  pdfBuff = await generatePdf(file, options);
    return pdfBuff as unknown as Buffer;

}

const app = express();

app.use(express.json());

app.use(express.urlencoded())

app.get('/template', async (req : Request,res:Response)=> {
    try {
    let template = await generatePdfs('this is our first dynamic template');
    res.setHeader('Content-Type','application/pdf')
    res.send(template)
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:'An error has Ocurred while generating the template please contact support.'
        })
    }
})

app.listen(3000,() => {
    console.log(`listening in port 3000`);
})

