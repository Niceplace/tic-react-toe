import { JsonDB } from 'node-json-db';
import { Config, JsonDBConfig } from 'node-json-db/dist/lib/JsonDBConfig';

let db: JsonDB;
const defaultConfig = new Config('ticReactToeDb', true, false, '/');

export const reloadConfig = (config: JsonDBConfig = defaultConfig): void => {
  console.log(`Setting config with ${config}`);
  db = new JsonDB(config);
  db.reload();
};

export const save = (entity: string, data: unknown, override = false): void => {
  db.reload();
  return db.push(entity, data, override);
};

export const get = (entity: string): unknown => db.getData(entity);
