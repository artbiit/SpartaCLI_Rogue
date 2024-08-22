import chalk from 'chalk';
import Unit from './unit/Unit.js';
import * as Actions from './unit/Action.js';
import Input from './lib/Input.js';
import Stats from './unit/Stats.js';
import MyMath from './lib/MyMath.js';
import Utils from './lib/Utils.js';
import TextTable from './lib/TextTable.js';

function displayStatus(stage, player, monster) {
 let text = TextTable.FormatText('battle_stage_info', {
    stage,
    player_name: player.name,
    player_current_hp: player.stats.current_hp,
    player_max_hp: player.stats.max_hp,
    player_atk_min: player.stats.atk_range.min_atk,
    player_atk_max: player.stats.atk_range.max_atk,
    player_defense_rating: player.stats.defense_rating.toFixed(2),
    player_luck: (player.stats.luck * 100.0).toFixed(2),
    monster_name: monster.name,
    monster_current_hp: monster.stats.current_hp,
    monster_max_hp:monster.stats.max_hp,
    monster_atk_min: monster.stats.atk_range.min_atk,
    monster_atk_max: monster.stats.atk_range.max_atk,
    monster_def: monster.stats.defense_rating.toFixed(2),
    monster_luck : (monster.stats.luck * 100.0 ).toFixed(2)
});

console.log(Utils.FormatTextForConsole(text));

}

const battle = async (stage, player, monster) => {
  let logs = [];

  let player_actions_text = player.actions.map(action => {
    const probabilityWithLuck = (100.0 - (action.probability + player.stats.luck) * 100.0).toFixed(2);
    return `${TextTable.FormatText(action.name)}(${probabilityWithLuck}%)`;
}).join(', ');

player_actions_text = TextTable.FormatText('action_info', {actions: player_actions_text});
  while(player.stats.current_hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(player_actions_text);
    const choice =await Input.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리
    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
  }
  
};

function CreatePlayerDefaultStats(){
  const max_hp = 100;
  const default_atk = 6;
  const atk_rating = 0.5;
  const defense_rating = 0.0;
  const luck = 0.0;
  const stats = new Stats(max_hp,default_atk,atk_rating,defense_rating,luck );
  return stats;
}

function CreateMonsterStats(stage){

  const max_hp = MyMath.RandomRangeInt(20 + 10 * (stage-1), 20 + 15 * (stage-1));
  const default_atk = MyMath.RandomRangeInt( stage * 3 , stage * 3 + stage * 2) ;
  const atk_rating = MyMath.RandomRange(0.5, 0.9 + stage * 0.1);
  const defense_rating = stage * 0.01;
  const luck = (1 << (stage - 1)) * 0.001;
  const stats = new Stats(max_hp,default_atk,atk_rating,defense_rating,luck );
  return stats;
}

export async function startGame() {
  console.clear();
  const player = new Unit('플레이어', CreatePlayerDefaultStats() );
  player.InsertAction(new Actions.GamblingAction()); //사용자만 도박에 시도할 수 있습니다.
  let stage = 1;

  while (stage <= 10) {
    const monster = new Unit('몬스터', CreateMonsterStats(stage));
    await battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건

    stage++;
  }
}