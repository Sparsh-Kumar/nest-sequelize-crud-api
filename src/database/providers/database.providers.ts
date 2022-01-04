

import { Sequelize } from "sequelize-typescript";
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from "../database.config";
import { Tasks} from "src/tasks/models/tasks.model";
import { Users } from "src/users/models/users.model";

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            
            let config;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case TEST:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
                    break;
            }

            const sequelize = new Sequelize (config);
            sequelize.addModels ([Tasks, Users]);
            await sequelize.sync ();
            return sequelize;

        }

    }
]