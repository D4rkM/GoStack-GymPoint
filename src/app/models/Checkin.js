import Sequelize, { Model } from 'sequelize';

class Checkin extends Model {
    static init(sequelize) {
        super.init(
            {
                student_id: Sequelize.NUMBER,
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
        this.belongsTo(models.Plan, {
            foreignKey: 'plan_id',
            as: 'plan',
        });
    }
}

export default Checkin;
