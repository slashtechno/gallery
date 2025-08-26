import { dataStorage } from "$lib/storage.server";
import { snapshot } from "unstorage";

const data = await snapshot(dataStorage, "");
console.log(data)
