import {Router} from 'express';

import multer from 'multer';
import uploadConfig from './config/upload';

import OrphanageController from './controllers/OrphanageController'


const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages',OrphanageController.index);

routes.get('/orphanage/:id',OrphanageController.show);

routes.post('/orphanage',upload.array('images'),OrphanageController.create);

routes.delete('/orphanage/:id', OrphanageController.delete);

export default routes;