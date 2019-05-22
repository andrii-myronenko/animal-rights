export type Maybe<T> =  T | undefined | null;

export enum AnimalType{
    Dog = "Dog",
    Cat = "Cat",
    Hamster = "Hamster",
    Other = "Other"
}

export enum Order{
    ASC = "ASC",
    DESC = "DESC"
}

export const PossibleTypes = [
    "Dog",
    "Cat",
    "Hamster",
    "Other"
];

export interface Animal {
    id: string; 
    name: string; 
    description: string;
    photoUrl: string;
    dateOfCreation: string;
    type: string;
}