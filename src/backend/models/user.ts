import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";
import { Credentials } from "./credentials";
import { Length, IsDate } from "class-validator";

@Entity()
export class User {
    
    @ObjectIdColumn()
    id: ObjectID;
    
    @Column({nullable: false})
    @Length(3, 64)
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column(type => Credentials)
    credentials: Credentials

    @Column()
    photoUrl: string

    @Column({default: Date.now})
    @IsDate()
    dateOfRegistration: Date

}
