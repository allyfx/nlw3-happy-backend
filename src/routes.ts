import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'),OrphanagesController.create);

routes.post('/user/register', UsersController.create);
routes.post('/user/authenticate', SessionsController.create);

export default routes;