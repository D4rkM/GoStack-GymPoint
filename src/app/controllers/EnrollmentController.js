import { parseISO, addMonths } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';

class EnrollmentController {
    async index(req, res) {
        return res.json({ message: 'ok' });
    }

    async store(req, res) {
        const { student_id, plan_id, start_date } = req.body;
        const parsedDate = parseISO(start_date);

        const { price, duration } = await Plan.findByPk(plan_id);

        // calculate time
        const end_date = addMonths(parsedDate, duration);

        // calculate price
        const final_price = price * duration;

        const enrollment = await Enrollment.create({
            student_id,
            plan_id,
            start_date: parsedDate,
            end_date,
            price: final_price,
        });

        // save on db

        // send mail

        return res.json({ enrollment });
    }
}

export default new EnrollmentController();
