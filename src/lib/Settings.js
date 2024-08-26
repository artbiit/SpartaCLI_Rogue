import Settings from "../../resources/Settings.json"   assert { type: 'json' }; 
import fs from "fs";
import path from "path";

/**
 * 게임 설정을 관리하는 모듈입니다.
 * 설정은 JSON 파일에서 로드되며, 변경된 설정을 저장할 수 있습니다.
 */

/**
 * 설정을 저장하는 함수입니다.
 * @returns {Promise<void>}
 */
async function Save(){
    await fs.writeFile(path.join(process.cwd(), "./resources/Settings.json"), JSON.stringify(Settings, null, 2), 'utf8', (error => {if(error) throw error}));
}

export default  Settings;
export {Settings, Save};
