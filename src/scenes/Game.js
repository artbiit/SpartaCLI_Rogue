import Unit from '../unit/Unit.js';
import * as Actions from '../unit/Action.js';
import Input from '../lib/Input.js';
import Stats from '../unit/Stats.js';
import MyMath from '../lib/MyMath.js';
import TextTable from '../lib/TextTable.js';
import Command from '../lib/Command.js';
import Utils from '../lib/Utils.js';
import Settings from '../lib/Settings.js';
import EventBus from '../lib/eventBus.js';
const commands = new Command();

const achievements = {
  /**
   * 몬스터가 처치될 때 호출됩니다.
   * @param {string} monsterType 몬스터의 종류
   */
  monsterKilled: (monsterType) => {
    EventBus.emit('monsterKilled', monsterType);
  },

  /**
   * 몬스터를 조우할 때 호출됩니다.
   * @param {string} monsterType 몬스터의 종류
   */
  monsterEncounterd: (monsterType) => {
    EventBus.emit('monsterEncountered', monsterType);
  },

  /**
   * 보스에게서 승리했을 때 호출됩니다.
   */
  victory: () => {
    EventBus.emit('victory_count');
  },

  /**
   * 게임 시작 시 호출됩니다.
   */
  gameStart: () => {
    EventBus.emit('start_count');
  },

  /**
   * 데미지를 가했을 때 호출됩니다.
   * @param {number} dmg 가한 데미지 양
   */
  dmgDealt: (dmg) => {
    EventBus.emit('total_dmg_dealt', dmg);
  },

  /**
   * 데미지를 받았을 때 호출됩니다.
   * @param {number} dmg 받은 데미지 양
   */
  dmgTaken: (dmg) => {
    EventBus.emit('total_dmg_taken', dmg);
  },

  /**
   * 치유를 받았을 때 호출됩니다.
   * @param {number} heal 치유량
   */
  healTaken: (heal) => {
    EventBus.emit('total_heal', heal);
  },

  /**
   * 패배했을 때 호출됩니다.
   */
  lose: () => {
    EventBus.emit('lose_count');
  },

  /**
   * 엘릭서를 수집했을 때 호출됩니다.
   */
  elixirCollected: () => {
    EventBus.emit('collect_elixir');
  },

  /**
   * 업적을 저장할 때 호출됩니다.
   */
  save: () => {
    EventBus.emit('achievementsSave');
  },
};

/**
 * 현재 스테이지, 플레이어, 몬스터의 상태를 출력합니다.
 * @param {number} stage 현재 스테이지 번호
 * @param {Unit} player 플레이어 유닛
 * @param {Unit} monster 몬스터 유닛
 */
function displayStatus(stage, player, monster) {
  console.clear();
  let text = TextTable.FormatText('battle_stage_info', {
    stage,
    player_name: player.name,
    player_current_hp: player.stats.current_hp,
    player_max_hp: player.stats.max_hp,
    player_atk_min: player.stats.atk_range.min_atk,
    player_atk_max: player.stats.atk_range.max_atk,
    player_defense_rating: (player.stats.defense_rating * 100.0).toFixed(2),
    player_luck: (player.stats.luck * 100.0).toFixed(2),
    monster_name: monster.name,
    monster_current_hp: monster.stats.current_hp,
    monster_max_hp: monster.stats.max_hp,
    monster_atk_min: monster.stats.atk_range.min_atk,
    monster_atk_max: monster.stats.atk_range.max_atk,
    monster_def: (monster.stats.defense_rating * 100.0).toFixed(2),
    monster_luck: (monster.stats.luck * 100.0).toFixed(2),
  });

  console.log(TextTable.FormatTextForConsole(text));
}

/**
 * 몬스터가 행동을 수행합니다.
 * @param {Unit} player 플레이어 유닛
 * @param {Unit} monster 몬스터 유닛
 * @returns {Array<string>} 몬스터 행동 결과
 */
const monsterAction = (player, monster) => {
  const playerHp = player.stats.current_hp;
  const monsterHp = monster.stats.current_hp;
  const monsterMaxAtk = monster.stats.atk_range.max_atk;
  const playerDefense = player.stats.defense_rating;

  let actionResult = null;

  if (playerHp <= monsterHp) {
    if (playerHp <= monsterMaxAtk) {
      if (playerDefense < 0.2) {
        actionResult = monster.actions[0].DoAction(monster, player);
      } else {
        actionResult = monster.actions[2].DoAction(monster, player);
      }
    } else {
      if (monsterHp - playerHp >= monsterMaxAtk) {
        if (Math.random() < 0.8) {
          actionResult = monster.actions[1].DoAction(monster, player);
        } else {
          actionResult = monster.actions[2].DoAction(monster, player);
        }
      } else {
        if (Math.random() < 0.6) {
          actionResult = monster.actions[0].DoAction(monster, player);
        } else {
          actionResult = monster.actions[2].DoAction(monster, player);
        }
      }
    }
  } else {
    if (monsterHp <= monster.stats.max_hp * 0.2) {
      if (Math.random() < 0.5) {
        actionResult = monster.actions[0].DoAction(monster, player);
      } else {
        actionResult = monster.actions[1].DoAction(monster, player);
      }
    } else if (playerHp <= monsterMaxAtk) {
      if (Math.random() < 0.7) {
        actionResult = monster.actions[1].DoAction(monster, player);
      } else {
        actionResult = monster.actions[0].DoAction(monster, player);
      }
    } else {
      if (playerDefense < 0.3) {
        actionResult = monster.actions[0].DoAction(monster, player);
      } else {
        actionResult = monster.actions[1].DoAction(monster, player);
      }
    }
  }

  const dmgTaken = playerHp - player.stats.current_hp;
  if (dmgTaken !== 0) {
    achievements.dmgTaken(dmgTaken);
  }

  return actionResult;
};

/**
 * 전투를 수행하는 함수입니다.
 * @param {number} stage 현재 스테이지 번호
 * @param {Unit} player 플레이어 유닛
 * @param {Unit} monster 몬스터 유닛
 */
const battle = async (stage, player, monster) => {
  let logs = [];
  let player_actions_text = player.actions
    .map((action) => {
      const probabilityWithLuck = (
        100.0 -
        MyMath.Clamp(action.probability - player.stats.luck, 0.0, 1.0) * 100.0
      ).toFixed(2);
      return `${TextTable.FormatText(action.name)}(${probabilityWithLuck}%)`;
    })
    .join(', ');
  player_actions_text = TextTable.FormatText('action_info', { actions: player_actions_text });

  while (true) {
    displayStatus(stage, player, monster);
    console.log(logs.slice(11 - process.stdout.rows).join('\n'));
    console.log(player_actions_text);
    const choice = await Input.question(TextTable.FormatText('question_action'));

    const prev_monster_hp = monster.stats.current_hp;
    const prev_player_hp = player.stats.current_hp;

    const command_result = await commands.ExecuteCommand(choice, player, monster);
    if (command_result !== false) {
      logs.push(...command_result);
      command_result.forEach((desc) => {
        console.log(desc);
      });

      let delta = player.stats.current_hp - prev_player_hp;
      if (delta > 0) {
        achievements.healTaken(delta);
      }

      delta = prev_monster_hp - monster.stats.current_hp;
      if (delta !== 0) {
        achievements.dmgDealt(delta);
      }

      await Utils.Delay(500);
      if (monster.stats.current_hp <= 0) {
        break;
      }
      const monster_result = monsterAction(player, monster);
      logs.push(...monster_result);
      monster_result.forEach((desc) => {
        console.log(desc);
      });
      if (player.stats.current_hp <= 0) {
        break;
      }
    } else {
      TextTable.Output('wrong_select');
    }
    await Utils.Delay(500);
  }
};

/**
 * 엘릭서 시나리오를 처리하는 함수입니다.
 * @param {Unit} player 플레이어 유닛
 */
const elixirScenario = async (player) => {
  if (MyMath.CalcProbability(0.9)) {
    achievements.elixirCollected();
    let percent = MyMath.RandomRangeInt(10, 31) * 1.0;
    const org_percent = percent;
    TextTable.Output('get_elixir', { percent });

    if (await Input.keyInYN(TextTable.FormatText('use_question'))) {
      const recovery_hp = MyMath.Floor(player.stats.max_hp * percent * 0.01);
      player.stats.modifyCurrentHP(recovery_hp);
      TextTable.Output('used_elixir', {
        percent: org_percent,
        recovery_hp,
        current_hp: player.stats.current_hp,
      });
    } else {
      const statsToUpgrade = ['max_hp', 'default_atk', 'atk_rating', 'defense_rating', 'luck'];
      const upgrades = {};

      statsToUpgrade.forEach((stat, index) => {
        if (index === statsToUpgrade.length - 1) {
          upgrades[stat] = percent;
        } else {
          const allocation = MyMath.RandomRangeInt(0, percent + 1);
          upgrades[stat] = allocation;
          percent -= allocation;
        }
      });

      let changes = {};

      const maxHpChange = MyMath.Floor(player.stats.max_hp * (upgrades['max_hp'] / 100.0));
      if (maxHpChange !== 0) {
        player.stats.modifyMaxHP(maxHpChange);
        player.stats.modifyCurrentHP(maxHpChange);
        changes['HP'] = maxHpChange;
      }

      const { _, max_atk } = player.stats.atk_range;
      const delta = upgrades['default_atk'] % 10;
      upgrades['atk_rating'] += MyMath.Floor(upgrades['default_atk'] * 0.1);
      if (delta !== 0) {
        player.stats.modifyDefaultAtk(delta);
        changes['MIN_ATK'] = delta.toString();
      }

      const atkRatingChange = player.stats.atk_rating * (upgrades['atk_rating'] / 100.0);
      player.stats.modifyAtkRating(atkRatingChange);
      let stat_delta = player.stats.atk_range.max_atk - max_atk;
      if (stat_delta !== 0) {
        changes['MAX_ATK'] = stat_delta.toString();
      }

      if (upgrades['defense_rating'] !== 0) {
        const defenseRatingChange = upgrades['defense_rating'] / 100.0;
        player.stats.modifyDefenseRating(defenseRatingChange);
        changes['DEF'] = defenseRatingChange.toFixed(2);
      }

      if (upgrades['luck'] !== 0) {
        const luckChange = upgrades['luck'] / 100.0;
        player.stats.modifyLuck(luckChange);
        changes['LUCK'] = luckChange.toFixed(2);
      }

      TextTable.Output('sell_elixir', { percent: org_percent });
      for (const [key, value] of Object.entries(changes)) {
        TextTable.Output('buff', {
          stat_name: key,
          value: `${key}(${value === '' ? '' : `+${value}`})`,
        });
        await Utils.Delay(500);
      }
    }
    await Input.question(TextTable.FormatText('any_key'));
  }
};

/**
 * 승리 시나리오를 처리하는 함수입니다.
 * @param {Unit} player 플레이어 유닛
 * @param {number} stage 현재 스테이지 번호
 */
const victoryScenario = async (player, stage) => {
  const maxHpIncrease = MyMath.Floor(player.stats.max_hp * MyMath.RandomRange(0.01, 0.1) * stage);
  player.stats.modifyMaxHP(maxHpIncrease);
  TextTable.Output('buff', { stat_name: 'MAX_HP', value: maxHpIncrease });
  await Utils.Delay(500);
  let statIncrease = 0;
  let statName = '';
  for (let i = 0; i < 4; i++) {
    if (MyMath.CalcProbability(0.55)) {
      switch (i) {
        case 0:
          statIncrease = Math.round(
            player.stats.default_atk * stage * MyMath.RandomRange(0.1, 0.2),
          );
          statName = 'MIN_ATK';
          player.stats.modifyDefaultAtk(statIncrease);
          break;
        case 1:
          statIncrease = stage * MyMath.RandomRange(0.01, 0.1);
          const tmp = player.stats.atk_range.max_atk;
          statName = 'MAX_ATK';
          player.stats.modifyAtkRating(statIncrease);
          statIncrease = player.stats.atk_range.max_atk - tmp;
          if (statIncrease === 0) {
            continue;
          }
          break;
        case 2:
          statIncrease = MyMath.RandomRange(0.01, 0.02);
          statName = 'DEF';
          player.stats.modifyDefenseRating(statIncrease);
          statIncrease = statIncrease.toFixed(2);
          break;
        case 3:
          statIncrease = MyMath.RandomRange(0.01, 0.015);
          statName = 'LUCK';
          player.stats.modifyLuck(statIncrease);
          statIncrease = statIncrease.toFixed(2);
          break;
      }

      TextTable.Output('buff', { stat_name: statName, value: statIncrease });

      await Utils.Delay(500);
    }
  }
  const currentHpIncrease = MyMath.Floor((player.stats.max_hp - player.stats.current_hp) * 0.5);
  player.stats.modifyCurrentHP(currentHpIncrease);
  TextTable.Output('heal', { value: currentHpIncrease, current_hp: player.stats.current_hp });
  await Utils.Delay(500);

  await Input.question(TextTable.FormatText('any_key'));
};

/**
 * 기본 플레이어 스탯을 생성하는 함수입니다.
 * @returns {Stats} 생성된 플레이어 스탯
 */
function CreatePlayerDefaultStats() {
  const max_hp = MyMath.RandomRangeInt(100, 121);
  const default_atk = MyMath.RandomRangeInt(5, 10);
  const atk_rating = MyMath.RandomRange(0.4, 0.6);
  const defense_rating = MyMath.RandomRange(0.0, 0.011);
  const luck = 0.0;
  const stats = new Stats(max_hp, default_atk, atk_rating, defense_rating, luck);
  return stats;
}

/**
 * 몬스터의 스탯을 생성하는 함수입니다.
 * @param {number} stage 현재 스테이지 번호
 * @returns {Stats} 생성된 몬스터 스탯
 */
function CreateMonsterStats(stage) {
  const max_hp = MyMath.RandomRangeInt(21 + 10 * stage, 20 + 15 * stage);
  const default_atk = MyMath.RandomRangeInt(stage * 3, stage * 3 + stage * 2);
  const atk_rating = MyMath.RandomRange(0.5, 0.9 + stage * 0.1);
  const defense_rating = MyMath.RandomRange(stage, stage * stage) * 0.01;
  const luck = MyMath.RandomRange(stage - 1.0, stage + 1.0) * 0.01;
  const stats = new Stats(max_hp, default_atk, atk_rating, defense_rating, luck);
  return stats;
}

/**
 * 게임을 시작하는 함수입니다.
 */
export async function startGame() {
  achievements.gameStart();

  let stage = 1;
  const last_stage = 10;
  const player = new Unit(Settings.player_name, CreatePlayerDefaultStats());
  player.InsertAction(new Actions.GamblingAction());
  player.actions.forEach((action) => {
    commands.AddCommand(TextTable.FormatText(action.name), action.DoAction);
  });

  while (stage <= last_stage) {
    console.clear();
    let monster_name = '';
    if (stage === last_stage) {
      monster_name = Settings.boss_monster_name;
    } else {
      monster_name = MyMath.RandomPick(Settings.normal_monster_names);
    }
    achievements.monsterEncounterd(monster_name);
    const monster = new Unit(monster_name, CreateMonsterStats(stage));
    TextTable.Output('encounter', { name: monster_name });
    await Utils.Delay(750);
    await battle(stage, player, monster);

    const victory = player.stats.current_hp > 0;
    displayStatus(stage, player, monster);
    TextTable.Output(victory ? 'victory' : 'lose', {
      player: player.name,
      monster: monster.name,
    });
    if (victory) {
      achievements.monsterKilled(monster_name);
      if (stage !== last_stage) {
        await victoryScenario(player, stage);
        displayStatus(stage, player, monster);
        await elixirScenario(player);
      } else {
        achievements.victory();
        TextTable.Output('clear_all_stage', { boss_monster_name: Settings.boss_monster_name });
        await Utils.Delay(1000);
      }
    } else {
      achievements.lose();
      stage = last_stage;
    }
    achievements.save();
    stage++;
  }

  await Input.question(TextTable.FormatText('back_to_lobby'));
}
