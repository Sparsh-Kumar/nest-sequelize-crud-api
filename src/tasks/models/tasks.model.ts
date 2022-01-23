

import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Users } from 'src/users/models/users.model';
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
        type: DataType.STRING,
        values: [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
        defaultValue: TaskStatus.OPEN
    })
    status: string;

    @ForeignKey(() => Users)
    @Column ({
        type: DataType.UUID
    })
    userId: string;

    @BelongsTo(() => Users)
    user: Users

    //https://github.com/RobinBuschmann/sequelize-typescript
    /*
        Relations can be described directly in the model by the
        @HasMany, @HasOne, @BelongsTo, @BelongsToMany and @ForeignKey annotations.
    */
}