import Enrollment from '../models/Enrolment';

class EnrollmentController {
    async index(req, res) {
        return res.json({ message: 'ok' });
    }

    async store(req, res) {
        return res.json({ message: 'ok' });
    }
}

export default new EnrollmentController();
