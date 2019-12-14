import 'dotenv/config';

import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';

import databaseConfig from '../config/database';

const models = [User, Student];

class Database {
    constructor() {
        this.init();
    }

    // Inicia a conexão com o banco de dados para cada models
    init() {
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();
