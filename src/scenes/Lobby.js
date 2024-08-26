import { startGame as StartGame } from './Game.js';
import TextTable from '../lib/TextTable.js';
import Input from '../lib/Input.js';
import Command from '../lib/Command.js';
import Utils from '../lib/Utils.js';
import Option from './Option.js';
import Achievements from '../lib/Achievements.js';

let continued = true;
let menus = null;
let lobbyText = '';

function setCommand() {
  if (menus === null) {
    menus = new Command();
    menus.AddCommand(TextTable.FormatText('lobby_game_start'), StartGame);
    menus.AddCommand(TextTable.FormatText('lobby_option'), Option);
    menus.AddCommand(TextTable.FormatText('lobby_exit'), async () => {
      TextTable.Output('game_exit');
      continued = false;
    });
  }

  const achievementsText = TextTable.FormatText('lobby_achievements');
  const included = Array.from(menus.keys).includes(achievementsText);
  if (!included && Achievements.achievements.start_count > 0) {
    menus.InsertCommandAt(achievementsText, viewAchievements, 1);
  } else if (included && Achievements.achievements.start_count <= 0) {
    menus.RemoveCommand(achievementsText);
  }

  lobbyText = TextTable.FormatText('lobby_menu', { menu_list: Array.from(menus.keys).join('\n') });
}
// 로비 화면을 출력하는 함수
function displayLobby() {
  console.clear();
  console.log(lobbyText);
}

async function viewAchievements() {
  console.clear();
  const delay = 500;
  TextTable.Output('achievements_view_start');
  await Utils.Delay(delay);
  TextTable.Output('achievements_start_count', { count: Achievements.achievements.start_count });
  await Utils.Delay(delay);
  TextTable.Output('achievements_monster');
  for (let monster in Achievements.achievements.encounter_monster) {
    try {
      const encounter = Achievements.achievements.encounter_monster[monster];
      const killed = Achievements.achievements.kill_monster[monster];
      let txt = TextTable.FormatText('achievements_monster_count', {
        name: monster,
        killed,
        encounter,
      });
      console.log(txt);
    } catch (error) {
      console.error(error);
      await Input.question('');
    }
    await Utils.Delay(200);
  }

  TextTable.Output('achievements_collect_elixir', {
    count: Achievements.achievements.collect_elixir,
  });
  await Utils.Delay(delay);

  TextTable.Output('achievements_total_dmg_dealt', {
    total: Achievements.achievements.total_dmg_dealt,
  });
  await Utils.Delay(delay);

  TextTable.Output('achievements_total_dmg_taken', {
    total: Achievements.achievements.total_dmg_taken,
  });
  await Utils.Delay(delay);

  TextTable.Output('achievements_total_heal', { total: Achievements.achievements.total_heal });
  await Utils.Delay(delay);

  TextTable.Output('achievements_victory_count', {
    count: Achievements.achievements.victory_count,
  });
  await Utils.Delay(delay);

  TextTable.Output('achievements_lose_count', { count: Achievements.achievements.lose_count });

  TextTable.Output('achievements_view_end');
  await Input.question(TextTable.FormatText('any_key'));
}

// 유저 입력을 받아 처리하는 함수
async function handleUserInput() {
  while (continued) {
    displayLobby();
    const text = TextTable.FormatText('input');
    const choice = await Input.question(text);
    if ((await menus.ExecuteCommand(choice)) !== false) {
    } else {
      TextTable.Output('wrong_select');
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
