import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import EnrollmentController from './app/controllers/EnrollmentController';
import PlanController from './app/controllers/PlanController';
import CheckinController from './app/controllers/CheckinController';

import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';
import validatePlanStore from './app/validators/PlanStore';
import validateEnrollmentStore from './app/validators/EnrollmentStore';
import validateEnrollmentUpdate from './app/validators/EnrollmentUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', validateSessionStore, SessionController.store);

routes.get('/students/:studentId/checkins', CheckinController.index);
routes.post('/students/:studentId/checkins', CheckinController.store);

routes.use(authMiddleware);

routes.delete('/students/:studentId/checkins', CheckinController.delete);

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
routes.post(
    '/enrollments',
    validateEnrollmentStore,
    EnrollmentController.store
);
routes.put(
    '/enrollments/:enrollmentId',
    validateEnrollmentUpdate,
    EnrollmentController.update
);
routes.delete('/enrollments/:enrollmentId', EnrollmentController.delete);

export default routes;
