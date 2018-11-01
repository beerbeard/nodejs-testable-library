import Sequelize from 'sequelize';

import fs from 'fs';
import path from 'path';

let database = null;

// Import models dynamically
const loadModels = (sequelize) => {

    const directory = path.join(__dirname, '../models');

    let models = [];

    fs.readdirSync(directory).forEach(file => {
        
        // Import the model from directory
        const model = sequelize.import(path.join(directory, file));

        models[model.name] = model;
    });

    return models;
};

export default (app) => {
    
    if (!database) {

        const config = app.config;
        const sequelize = new Sequelize(config.database, config.username, config.password, config.params);

        database = {
            sequelize,
            Sequelize,
            models: { }
        };

        database.models = loadModels(sequelize);

        sequelize.sync().done(() => database);
    }

    return database;
};