

import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { TaskStatus } from '../task.model';

@Table
export class Tasks extends Model {

    @Column ({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @Column ({
        type: DataType.STRING,
        allowNull: false
    })
    title: string;

    @Column ({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;

    @Column ({
        type: DataType.ENUM,
        values: [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
        defaultValue: TaskStatus.OPEN
    })
    status: string;

}