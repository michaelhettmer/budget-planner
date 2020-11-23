import lowdb, { LowdbAsync } from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";
import { Database } from "./dto";

let dbInstance: LowdbAsync<Database> | null = null;
const adapter = new FileAsync("db.json");

const init = async () => {
  dbInstance = await lowdb(adapter);
  await dbInstance
    .defaults<Database>({ version: 1, entries: [], apartments: [] })
    .write();
};

export const getDb = async () => {
  if (!dbInstance) await init();
  return dbInstance;
};
