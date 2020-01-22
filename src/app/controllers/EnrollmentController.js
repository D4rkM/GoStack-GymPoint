import { parseISO, addMonths } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
    async index(req, res) {
        const enrollments = await Enrollment.findAll();

        return res.json({ enrollments });
    }

    async store(req, res) {
        const { student_id, plan_id, start_date } = req.body;
        const parsedDate = parseISO(start_date);

        const { title, price, duration } = await Plan.findByPk(plan_id);

        const { name, email } = await Student.findByPk(student_id);

        // calculate time
        const end_date = addMonths(parsedDate, duration);

        // calculate price
        const final_price = price * duration;

        // save on db
        const enrollment = await Enrollment.create({
            student_id,
            plan_id,
            start_date: parsedDate,
            end_date,
            price: final_price,
        });

        // send mail
        await Queue.add(EnrollmentMail.key, {
            enrollment,
            student: {
                name,
                email,
            },
            plan: {
                title,
            },
        });

        return res.json({ enrollment });
    }

    async update(req, res) {
        const { start_date } = req.body;

        return res.json({ start_date });
    }

    async delete(req, res) {
        const { enrollmentId } = req.params;

        const enrollment = await Enrollment.findByPk(enrollmentId);

        if (!enrollment) {
            return res.status(400).json({ message: 'Enrollment not found!' });
        }

        await Enrollment.destroy({
            where: {
                id: enrollmentId,
            },
        });

        return res.json({ message: 'Enrollment deleted succesfully' });
    }
}

export default new EnrollmentController();
