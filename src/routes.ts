import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'),OrphanagesController.create);

routes.post('/user/register', UsersController.create);
routes.post('/user/authenticate', SessionsController.create);
routes.post('/user/forgot', ForgotPasswordController.create);
routes.post('/user/reset', ResetPasswordController.create);

export default routes;