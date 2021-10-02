

import { Tasks } from "../models/tasks.model";
import { TASK_REPOSITORY } from '../constants';


export const taskProviders = [{
    provide: TASK_REPOSITORY,
    useValue: Tasks,
}]
