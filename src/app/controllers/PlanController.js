import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        const plans = await Plan.findAll({
            attributes: ['id', 'title', 'duration', 'price'],
        });

        return res.json(plans);
    }

    async show(req, res) {
        const { planId } = req.params;

        const plan = await Plan.findByPk(planId, {
            attributes: ['id', 'title', 'duration', 'price'],
        });
        return res.json(plan);
    }

    async store(req, res) {
        const { title, duration, price } = await Plan.create(req.body);

        return res.json({ title, duration, price });
    }

    async update(req, res) {
        const { title, duration, price } = await Plan.update(req.body);

        return res.json({ title, duration, price });
    }

    async delete(req, res) {
        const { planId } = req.params;

        const plan = await Plan.findByPk(planId);

        if (!plan) {
            return res
                .status(400)
                .json({ message: 'This plan does not exist' });
        }

        await Plan.destroy({
            where: {
                id: planId,
            },
        });

        return res.json({ message: 'Plan deleted succesfully' });
    }
}

export default new PlanController();
