import { startOfWeek, endOfWeek, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';

class CheckinController {
    async index(req, res) {
        const { studentId } = req.params;

        const checkins = await Checkin.findAll({
            where: {
                student_id: studentId,
            },
        });

        return res.json({ checkins });
    }

    async store(req, res) {
        const { studentId } = req.params;

        const checkins = await Checkin.findAll({
            where: {
                student_id: studentId,
                created_at: {
                    [Op.between]: [
                        startOfWeek(new Date()),
                        endOfWeek(new Date()),
                    ],
                },
            },
        });

        if (Object.keys(checkins).length >= 5) {
            return res.status(404).json({
                message: "You can't make more checkins for this week.",
            });
        }

        const checkin = await Checkin.create({
            student_id: studentId,
        });

        return res.json({ checkin });
    }

    async delete(req, res) {
        return res.json({ message: 'deleted' });
    }
}

export default new CheckinController();
