import { Db, MongoClient } from 'mongodb';
export { getCollection };

const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxpry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbName = 'instagram-clone';
let dbConn: Db | null = null;

async function getCollection(collectionName: string) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    console.error('Error in mongodb get collection', err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(dbURL);
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    console.error('Error in get mongodb connect', err);
    throw err;
  }
}
