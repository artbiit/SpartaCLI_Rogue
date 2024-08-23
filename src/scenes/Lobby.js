import {startGame} from "./Game.js";
import TextTable from '../lib/TextTable.js';
import Input from '../lib/Input.js';
import Command from '../lib/Command.js';
import Utils from '../lib/Utils.js';

let continued = true;
const menus = new  Command();
menus.AddCommand("시작하기", startGame);
menus.AddCommand("업적보기",async () => {TextTable.Output('not_allow');});
menus.AddCommand("옵션설정",async () => {TextTable.Output('not_allow');});
menus.AddCommand("게임종료",async () => {TextTable.Output('game_exit');  continued = false;})
// 로비 화면을 출력하는 함수
function displayLobby() {
    console.clear();
    const menu_list = Array.from(menus.keys).join("\n");
    TextTable.Output("lobby_menu", {menu_list});

}

// 유저 입력을 받아 처리하는 함수
async function handleUserInput() {
  
    while(continued){
        displayLobby();
        const text = TextTable.FormatText('input');
        const choice = await Input.question(text);
        if(await menus.ExecuteCommand(choice)){

        }else{
            TextTable.Output('wrong_select')
        }
    await Utils.Delay(2000);

    }
}

// 게임 시작 함수
function start() {
    continued = true;
    handleUserInput();
}

export default () => { start(); };