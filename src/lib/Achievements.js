import Singleton from './Singleton.js';
import eventBus from './eventBus.js';
import path from 'path';
import fs from 'fs';

/**
 * 게임 내에서의 업적을 관리하는 클래스입니다.
 * 싱글톤 패턴을 사용하여 하나의 인스턴스만 존재합니다.
 */
class Achievements extends Singleton {
  #achievements;
  #jsonPath = '';

  constructor() {
    super();

    if (this.initialized) {
      return this;
    }

    this.#jsonPath = path.join(process.cwd(), './resources/Achievements.json');
    if (fs.existsSync(this.#jsonPath)) {
      const json = fs.readFileSync(this.#jsonPath, 'utf8');
      if (json !== '') {
        this.#achievements = JSON.parse(json);
      }
    } else {
      this.#achievements = {
        kill_monster: {},
        encounter_monster: {}, // 몬스터 조우 업적
        collect_elixir: 0,
        start_count: 0,
        total_dmg_dealt: 0,
        total_dmg_taken: 0,
        total_heal: 0,
        victory_count: 0,
        lose_count: 0,
      };
    }

    eventBus.on('monsterKilled', this.#incrementKillMonsterAchievement.bind(this));
    eventBus.on('monsterEncountered', this.#incrementEncounterMonsterAchievement.bind(this)); // 몬스터 조우 이벤트
    eventBus.on('achievementsSave', this.Save.bind(this));
    for (const key in this.#achievements) {
      if (this.#achievements.hasOwnProperty(key) && this.#achievements[key] === 0) {
        eventBus.on(key, this.#incrementAchievement.bind(this, key));
      }
    }

    this.initialized = true;
  }

  /** @returns {Object} 현재 업적 정보 */
  get achievements() {
    return this.#achievements;
  }

  /**
   * 몬스터 처치 업적을 증가시킵니다.
   * @param {string} monsterType 몬스터 종류
   */
  #incrementKillMonsterAchievement(monsterType) {
    if (!this.#achievements.kill_monster[monsterType]) {
      this.#achievements.kill_monster[monsterType] = 0;
    }
    this.#achievements.kill_monster[monsterType]++;
  }

  /**
   * 몬스터 조우 업적을 증가시킵니다.
   * @param {string} monsterType 몬스터 종류
   */
  #incrementEncounterMonsterAchievement(monsterType) {
    if (!this.#achievements.encounter_monster[monsterType]) {
      this.#achievements.encounter_monster[monsterType] = 0;
    }
    this.#achievements.encounter_monster[monsterType]++;
  }

  /**
   * 특정 업적을 증가시킵니다.
   * @param {string} achievementName 업적 이름
   * @param {number} [incrementBy=1] 증가시킬 값
   */
  #incrementAchievement(achievementName, incrementBy = 1) {
    if (this.#achievements[achievementName] !== undefined) {
      this.#achievements[achievementName] += incrementBy;
    } else {
      throw new Error(`Achievement ${achievementName} does not exist.`);
    }
  }

  /**
   * 업적 정보를 저장합니다.
   * @returns {Promise<void>}
   */
  async Save() {
    const data = JSON.stringify(this.#achievements, null, 2);
    await fs.writeFile(this.#jsonPath, data, 'utf8', (error) => {
      if (error) throw error;
    });
  }
}

const achievements = new Achievements();
export default achievements;
