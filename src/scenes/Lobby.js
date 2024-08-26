import {startGame as StartGame} from "./Game.js";
import TextTable from '../lib/TextTable.js';
import Input from '../lib/Input.js';
import Command from '../lib/Command.js';
import Utils from '../lib/Utils.js';
import Option from './Option.js';

let continued = true;
let menus = null;
let lobbyText = '';

function setCommand(){
if(menus === null){
    menus = new Command();
    menus.AddCommand(TextTable.FormatText('lobby_game_start'), StartGame);
    menus.AddCommand(TextTable.FormatText('lobby_achievements'),async () => {TextTable.Output('not_allow');});
    menus.AddCommand(TextTable.FormatText('lobby_option'),Option);
    menus.AddCommand(TextTable.FormatText('lobby_exit'),async () => {TextTable.Output('game_exit');  continued = false;})

    lobbyText =   TextTable.FormatText("lobby_menu", {menu_list : Array.from(menus.keys).join("\n")});
}
}
// 로비 화면을 출력하는 함수
function displayLobby() {
    console.clear();
    console.log(lobbyText);
}

// 유저 입력을 받아 처리하는 함수
async function handleUserInput() {
  
    while(continued){
        displayLobby();
        const text = TextTable.FormatText('input');
        const choice = await Input.question(text);
        if(await menus.ExecuteCommand(choice) !== false){

        }else{
            TextTable.Output('wrong_select')
        }
    await Utils.Delay(1000);

    }
}

// 게임 시작 함수
async function start() {
    continued = true;
    setCommand();
    handleUserInput();
}

export default start;