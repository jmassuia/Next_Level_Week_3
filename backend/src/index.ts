import express from 'express';
import path from 'path';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import errorHandler from './err/handleErrors';

import './database/connection';

const app = express();


app.use(express.json());
app.use(cors());

app.use(routes);
app.use('/uploads',express.static(path.join(__dirname,'..','uploads')));
app.use(errorHandler);

const serverPath = 'http://localhost:8888/';
app.listen(8888,()=>{
    console.log(`Server is running on ${serverPath}`);
})