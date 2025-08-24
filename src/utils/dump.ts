import { dataStorage } from "$lib/utils";
import { snapshot } from "unstorage";

const data = await snapshot(dataStorage, "");
console.log(data)
