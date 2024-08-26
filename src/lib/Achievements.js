import Singleton from './Singleton.js';
import eventBus from './eventBus.js';
import path from 'path';
import fs from 'fs';

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
        encounter_monster: {}, // Correct property name
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
    eventBus.on('monsterEncountered', this.#incrementEncounterMonsterAchievement.bind(this)); // Correct binding
    eventBus.on('achievementsSave', this.Save.bind(this));
    for (const key in this.#achievements) {
      if (this.#achievements.hasOwnProperty(key) && this.#achievements[key] === 0) {
        eventBus.on(key, this.#incrementAchievement.bind(this, key));
      }
    }

    this.initialized = true;
  }

  get achievements() {
    return this.#achievements; // Corrected to return the private property
  }

  #incrementKillMonsterAchievement(monsterType) {
    if (!this.#achievements.kill_monster[monsterType]) {
      this.#achievements.kill_monster[monsterType] = 0;
    }
    this.#achievements.kill_monster[monsterType]++;
  }

  #incrementEncounterMonsterAchievement(monsterType) {
    if (!this.#achievements.encounter_monster[monsterType]) {
      this.#achievements.encounter_monster[monsterType] = 0;
    }
    this.#achievements.encounter_monster[monsterType]++;
  }

  #incrementAchievement(achievementName, incrementBy = 1) {
    if (this.#achievements[achievementName] !== undefined) {
      this.#achievements[achievementName] += incrementBy;
    } else {
      throw new Error(`Achievement ${achievementName} does not exist.`);
    }
  }

  async Save() {
    const data = JSON.stringify(this.#achievements, null, 2);
    await fs.writeFile(this.#jsonPath, data, 'utf8', (error) => {
      if (error) throw error;
    });
  }
}

const achievements = new Achievements();
export default achievements;
