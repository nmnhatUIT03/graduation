import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Vui lòng thêm MONGODB_URI vào file .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // Trong development, sử dụng global variable để giữ connection
  // qua các lần hot-reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Trong production, tạo client mới
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper function để lấy database
export async function getDatabase() {
  const client = await clientPromise;
  return client.db('invitation_db'); // Tên database
}

// Helper function để lấy collection
export async function getCollection(collectionName: string) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

