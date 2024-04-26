import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db, Collection } from 'mongodb';

class MongoDBConfig {
  private mongoServer: any;
  private mongoClient!: MongoClient;
  public db: Db | undefined;
  public paymentsCollection: Collection<any> | undefined;

  constructor() {}

  async start(): Promise<void> {
    this.mongoServer = new MongoMemoryServer();
    const mongoUri = await this.mongoServer.getUri();
    this.mongoClient = new MongoClient(mongoUri);
    await this.mongoClient.connect();
    this.db = this.mongoClient.db();
    this.paymentsCollection = this.db.collection('payments');
  }

  async stop(): Promise<void> {
    await this.mongoClient.close();
    await this.mongoServer.stop();
  }
}

export default MongoDBConfig;