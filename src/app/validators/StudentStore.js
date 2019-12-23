import * as Yup from 'yup';

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.string(),
            weight: Yup.string(),
            height: Yup.string(),
        });

        await schema.validate(req.body, {
            abortEarly: false,
        });

        return next();
    } catch (err) {
        return res.status(400).json({
            error: 'Validation fails',
            messages: err.inner,
        });
    }
};
