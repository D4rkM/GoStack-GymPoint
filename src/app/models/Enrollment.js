import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
    static init(sequelize) {
        super.init(
            {
                student_id: Sequelize.NUMBER,
                plan_id: Sequelize.NUMBER,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
                price: Sequelize.REAL,
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

export default Enrollment;
