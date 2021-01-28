import { MongoClient } from "https://deno.land/x/mongo@v0.13.0/mod.ts";

class DB {
  public client: MongoClient;

  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }

  async connect() {
    const client = new MongoClient();
    await client.connectWithUri(this.url);
    this.client = client;
  }

  get getDatabase() {
    return this.client.database(this.dbName);
  }
}

// @ts-ignore
const dbName = Deno.env.get("DB_NAME") || "budget";
// @ts-ignore
const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";
const db = new DB(dbName, dbHostUrl);
await db.connect()
export default db;
