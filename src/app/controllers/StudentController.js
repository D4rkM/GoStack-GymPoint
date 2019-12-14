import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const students = await Student.findAll({
            limit: 20,
            offset: (page - 1) * 20,
            order: ['name'],
            attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        });

        return res.json(students);
    }

    async show(req, res) {
        const { studentId } = req.params;

        const student = await Student.findByPk(studentId, {
            attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        return res.json(student);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.string(),
            weight: Yup.string(),
            height: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Validation fails',
            });
        }

        const userExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (userExists)
            return res.status(400).json({ error: 'User already exists.' });

        const { id, name, email } = await Student.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string(),
            name: Yup.string(),
            email: Yup.string().email(),
            age: Yup.string(),
            weight: Yup.string(),
            height: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Validation fails',
            });
        }

        return res.json({ status: true });
    }
}

export default new StudentController();
