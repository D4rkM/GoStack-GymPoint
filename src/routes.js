import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.get('/students/:studentId', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:studentId', StudentController.update);
// routes.delete('/student', StudentController.delete);
// routes.post('')

export default routes;
