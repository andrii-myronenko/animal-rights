import {Column} from "typeorm";
import {Length} from "class-validator";

export class Credentials {
    
    @Column({nullable: false})
    @Length(3, 64)
    login: string;
    
    @Column({nullable: false})
    @Length(3, 64)
    password: string;

}