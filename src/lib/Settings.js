import Settings from "../../resources/Settings.json"   assert { type: 'json' }; 
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function Save(){
    await fs.writeFile(path.join(__dirname, "../../resources/Settings.json"), JSON.stringify(Settings, null, 2), 'utf8', (error => {if(error) throw error}));
}

export default  Settings;
export {Settings, Save};
