
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

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

    @Column ({
        type: DataType.STRING,
        allowNull: false,
    })
    salt: string;

    async validatePassword(
        password: string,
    ):Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
    
}