import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { Length, IsDate } from "class-validator";
import { ObjectID as ObjectIDConstructor } from "mongodb";

export enum Roles{
    USER = "USER",
    ADMIN = "ADMIN"
}

@Entity()
export class User extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    @Length(3, 64)
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column({nullable: false})
    @Length(3, 64)
    login: string;
    
    @Column({nullable: false})
    password: string;

    @Column()
    photoUrl: string;

    @Column({default: Date.now})
    @IsDate()
    dateOfRegistration: Date;

    @Column({nullable: false})
    role: Roles;
    
    static async findByLogin(login: string){
        return this.findOne({where: {login}});
    }

    static async findByCredentials(login: string, password: string){
        return this.findOne({where: {login, password}});
    }

    static async findById(id: string){
        const user = await this.findOne({where: {"_id": new ObjectIDConstructor(id)}});
        return user;
    }

    static checkRoleAccess(requiredRole: string, currentRole: string){
        if(currentRole === "ADMIN"){
            return true;
        }
        if(currentRole === "USER" && requiredRole === "ADMIN"){
            return false;
        }
        return true;
    }
}
