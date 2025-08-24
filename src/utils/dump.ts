import { storage } from "$lib/db";
import { snapshot } from "unstorage";

const data = await snapshot(storage, "");
console.log(data)
