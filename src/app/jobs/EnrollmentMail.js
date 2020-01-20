import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
    get key() {
        return 'EnrollmentMail';
    }

    async handle({ data }) {
        const { enrollment, student, plan } = data;

        Mail.sendMail({
            to: `${student.name} <${student.email}>`,
            subject: 'Bem vindo ao Gympoint',
            template: 'welcome',
            context: {
                plan: plan.title,
                student: student.name,
                start_date: format(
                    parseISO(enrollment.start_date),
                    "dd 'de' MMMM', às' H:mm'h'",
                    {
                        locale: pt,
                    }
                ),
                end_date: format(
                    parseISO(enrollment.end_date),
                    "dd 'de' MMMM', às' H:mm'h'",
                    {
                        locale: pt,
                    }
                ),
            },
        });
        console.log('A fila executou');
    }
}

export default new EnrollmentMail();
