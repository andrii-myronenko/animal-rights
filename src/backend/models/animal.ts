import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { IsDate } from "class-validator";
import { ObjectID as ObjectIDConstructor } from "mongodb";
import { AnimalType, Order } from "@common/interfaces";
import { regexEscape } from "@modules/regexEscape";

@Entity()
export class Animal extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    name: string;
    
    @Column({nullable: false})
    description: string;
    
    @Column({default: Date.now})
    @IsDate()
    dateOfCreation: Date;
    
    @Column({nullable: false})
    type: AnimalType;

    @Column()
    photoUrl: string;
    
    static async findByName(name: string){
        return this.findOne({where: {name}});
    }

    static async findById(id: string){
        return this.findOne({where: {"_id": new ObjectIDConstructor(id)}});
    }

    static async findByTypesAndSearchQuery(offset: number, types: AnimalType[], count: number, order: Order, searchQuery: string){
        const options = [];
        for(const type of types){
            options.push({ "type": type });
        }
        const regex = new RegExp(regexEscape(searchQuery));
        const filter = { '$and': [ { "name": regex } ] } as any;
        if(options.length > 0){
            filter['$or'] = options;
        }
        return this.findAndCount({order: { dateOfCreation: order }, where: filter, skip: offset, take: count});
    }
}
