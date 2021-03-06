import * as Yup from 'yup';

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            id: Yup.string(),
            name: Yup.string(),
            email: Yup.string().email(),
            age: Yup.string(),
            weight: Yup.string(),
            height: Yup.string(),
        });

        await schema.validate(req.body, {
            abortEarly: false,
        });

        return next();
    } catch (err) {
        return res
            .status(400)
            .json({ error: 'Validation fails', messages: err.inner });
    }
};
