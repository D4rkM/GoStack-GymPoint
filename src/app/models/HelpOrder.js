import Sequelize, { Model } from 'sequelize';

class Checkin extends Model {
    static init(sequelize) {
        super.init(
            {
                student_id: Sequelize.NUMBER,
                question: Sequelize.STRING,
                answer: Sequelize.STRING,
                answer_at: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static assosicate(models) {
        this.belongsTo(models.Student, {
            foreignKey: 'student_id',
            as: 'student',
        });
    }
}

export default Checkin;
