"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongodb_1 = require("mongodb");
class MongoDBConfig {
    constructor() { }
    async start() {
        this.mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
        const mongoUri = await this.mongoServer.getUri();
        this.mongoClient = new mongodb_1.MongoClient(mongoUri);
        await this.mongoClient.connect();
        this.db = this.mongoClient.db();
        this.paymentsCollection = this.db.collection('payments');
    }
    async stop() {
        await this.mongoClient.close();
        await this.mongoServer.stop();
    }
}
exports.default = MongoDBConfig;
//# sourceMappingURL=mongoDbConfig.js.map