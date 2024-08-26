import Command from "../lib/Command.js";
import TextTable from "../lib/TextTable.js";
import Input from "../lib/Input.js";
import Utils from "../lib/Utils.js";
import {Settings, Save} from "../lib/Settings.js";

let selectOptions = null;
let selectOptionText = '';
let continued  = true;

let changePlayerNameText = '';
let defaultPlayerName = '';

let monsterChangeOptions = null;
let monsterChangeOptionListText = '';

let defaultBossName = '';

function displayOption(){
    console.clear();
    console.log(selectOptionText);
}


async function changePlayerName() {
    let newName = await Input.question(changePlayerNameText);
    if(newName == ''){
        newName = defaultPlayerName;
    }
    Settings.player_name = newName;
    TextTable.Output('option_changed_player_name', {new_name : newName});
}

async function changeBossName(){
    const prev_name = Settings.boss_monster_name;
    let newName = await Input.question(TextTable.FormatText('option_boss_name_question', {prev_name: Settings.boss_monster_name, default_name: defaultBossName}));
    if(newName == ''){
        newName = defaultBossName;
    }
    Settings.boss_monster_name = newName;
    TextTable.Output('option_changed_player_name', {new_name : newName, prev_name});
}

async function  addMonster() {
    const text = TextTable.FormatText('option_monster_add_question');
    const new_name = await Input.question(text);

    if(new_name){
        Settings.normal_monster_names.push(new_name);
        TextTable.Output('option_monster_add_result', {new_name})
    }else{
        TextTable.Output('wrong_select');
    }
}

async function  removeMonster() {
    console.clear();
    const text = TextTable.FormatText('option_monster_remove_question', {monster_list : Settings.normal_monster_names.join("\n")});
    const name = await Input.question(text);
    let index = Settings.normal_monster_names.findIndex(monsterName => monsterName === name);

    if(index === -1){
        TextTable.Output('wrong_select');
    }else{
        Settings.normal_monster_names.splice(index, 1);
        TextTable.Output('option_monster_remove_result', {monster_name: name});
    }
}

async function  changeMonster() {
    console.clear();
    let text = TextTable.FormatText('option_monster_change_question', {monster_list : Settings.normal_monster_names.join("\n")});
    let name = await Input.question(text);
    let index = Settings.normal_monster_names.findIndex(monsterName => monsterName === name);


    if(index === -1){
        TextTable.Output('wrong_select');
    }else{
        const prev_name = Settings.normal_monster_names[index];
        text = TextTable.FormatText('option_monster_change_question2', {prev_name});
        name = await Input.question(text);
        if(name){
            Settings.normal_monster_names[index] = name;
            TextTable.Output('option_monster_change_result', {prev_name, new_name:name});
        }else{
            TextTable.Output('wrong_select');
        }

    }
}


async function changeMonsters() {
    console.clear();
    TextTable.Output('option_monster_list', {monster_list: Settings.normal_monster_names.join("\n"), monster_options : monsterChangeOptionListText});
    
    const text = TextTable.FormatText('input');
    const choice = await Input.question(text);
    if(await monsterChangeOptions.ExecuteCommand(choice) !== false){

    }else{
        TextTable.Output('wrong_select');
    }
}

function setCommands(){
    if(selectOptions === null){
        selectOptions = new  Command();
        selectOptions.AddCommand(TextTable.FormatText( 'option_player_name'), changePlayerName);
        selectOptions.AddCommand(TextTable.FormatText( 'option_monster_name'), changeMonsters);
        selectOptions.AddCommand(TextTable.FormatText( 'option_boss_name'), changeBossName);
        selectOptions.AddCommand(TextTable.FormatText('option_exit'), async () => { try{ await Save(); continued = false; } catch(error){console.error(error); throw error;}})
        selectOptionText =  TextTable.FormatText('select_option', {option_list: Array.from( selectOptions.keys).join('\n')});
    
        defaultPlayerName =  TextTable.FormatText('default_player_name');
        changePlayerNameText = TextTable.FormatText('option_change_player_name', {default_name : defaultPlayerName});
    
        defaultBossName = TextTable.FormatText('default_boss_name');
    }
    
    if(monsterChangeOptions === null){
        monsterChangeOptions = new  Command();
        monsterChangeOptions.AddCommand(TextTable.FormatText('option_monster_add'), addMonster);
        monsterChangeOptions.AddCommand(TextTable.FormatText('option_monster_remove'), removeMonster);
        monsterChangeOptions.AddCommand(TextTable.FormatText('option_monster_change'), changeMonster);
        monsterChangeOptionListText = Array.from(monsterChangeOptions.keys).join("\n");    
    }
    }

async function Start() {
    continued = true;
    try{
    setCommands();
        while(continued){
            displayOption();
            const text = TextTable.FormatText('input');
            const choice = await Input.question(text);
            if(await selectOptions.ExecuteCommand(choice) !== false ){
    
            }else{
                TextTable.Output('wrong_select')
            }
        await Utils.Delay(1000);
    
        }
    }catch(error){
        console.error(error);
        await Input.question('');
    }
}



export default Start;