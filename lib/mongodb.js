import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = 'test-proj';

async function connectToDatabase() {
    await client.connect();
    const db = client.db(dbName);
    return { db, client };
}

export default connectToDatabase;
