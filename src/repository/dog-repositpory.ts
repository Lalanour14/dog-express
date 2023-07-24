import { MongoClient } from "mongodb";
import { Dog} from "../entities";

export const connection = new MongoClient(process.env.DATABASE_URL!);

const cleanup = () => {
    connection.close();
    process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);


const collection = connection.db('dog-express').collection<Dog>('dog');


export const dogRepository = {
    findAll(){
        return collection.find().toArray();
    },
    async persist(dog:Dog) {
        const result= await collection.insertOne(dog);
        dog._id = result.insertedId; 
        return dog;
    }
}
