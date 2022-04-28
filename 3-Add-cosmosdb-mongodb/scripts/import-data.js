import 'dotenv/config';
import { MongoClient } from 'mongodb';
import {readFile } from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongodbConnectionUrl = process.env.MONGODB_URI_CONNECTION_STRING;
const mongodbDatabaseName = process.env.MONGODB_URI_DATABASE_NAME;
const mongodbCollectionName = process.env.MONGODB_URI_COLLECTION_NAME;

const client = new MongoClient(mongodbConnectionUrl);

async function importData() {

        // connect to database and collection
        await client.connect();
        const db = await client.db(mongodbDatabaseName);
        const collection = await db.collection(mongodbCollectionName);

        // get data file path
        const fileWithPath = path.join(__dirname, '../data/fake-rentals.json');
        console.log(`Read file at ${fileWithPath}`);

        // read data file
        const json = await readFile(fileWithPath, 'utf-8');
        const data = JSON.parse(json)
        console.log(data);

        // insert data into collection
        const insertResult = await collection.insertMany(data);
        console.log(`Inserted documents `, insertResult);
}

importData().then(()=>{
    console.log('done');
}).catch((err) =>{
    console.log(`${err}`);
}).finally(()=> client.close())