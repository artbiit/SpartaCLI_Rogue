import Settings from "../../resources/Settings.json"   assert { type: 'json' }; 
import fs from "fs";
import path from "path";

async function Save(){
    await fs.writeFile(path.join(process.cwd(), "./resources/Settings.json"), JSON.stringify(Settings, null, 2), 'utf8', (error => {if(error) throw error}));
}

export default  Settings;
export {Settings, Save};
