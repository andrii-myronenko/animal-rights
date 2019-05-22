import gql from "graphql-tag";
import { AnimalType, Order, Animal } from "@common/interfaces";

export const GET_ANIMALS = gql`
    query AnimalsQuery($offset: Int!, $types: [AnimalType]!, $number: Int!, $order: Order!, $searchQuery: String) {
        getAnimals(offset: $offset, types: $types, number: $number, order: $order, searchQuery: $searchQuery){
            animals{
                id
                name
                description
                photoUrl
                dateOfCreation
                type
            }
            count
        }
    }
`;

export interface Data {
    getAnimals: {
        animals: Array<Animal>;
        count: number;
    };
}
  
export interface Variables {
    types: AnimalType[];
    offset: number;
    order: Order;
    number: number;
    searchQuery: string;
}

