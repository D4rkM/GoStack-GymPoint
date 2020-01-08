import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import EnrollmentController from './app/controllers/EnrollmentController';
import PlanController from './app/controllers/PlanController';

import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';
import validatePlanStore from './app/validators/PlanStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.get('/students/:studentId', StudentController.show);
routes.post('/students', validateStudentStore, StudentController.store);
routes.put(
    '/students/:studentId',
    validateStudentUpdate,
    StudentController.update
);
// routes.delete('/student', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.get('/plans/:planId', PlanController.show);
routes.post('/plans', validatePlanStore, PlanController.store);
routes.put('/plans', PlanController.update);
routes.delete('/plans/:planId', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);

export default routes;
