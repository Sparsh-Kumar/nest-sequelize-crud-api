
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Users extends Model {


    @Column ({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    username: string;

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column ({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;
    
}