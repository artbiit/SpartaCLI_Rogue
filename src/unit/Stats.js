import MyMath from "../lib/MyMath.js";

class Stats {
    #current_hp = 0;
    #max_hp = 0;
    #default_atk = 0;
    #atk_rating = 0.0;
    #defense_rating = 0.0;
    #atk_range = { min_atk: 0, max_atk: 0 };
    #luck = 0.0;

    constructor(max_hp = 100, default_atk = 10, atk_rating = 0.1, defense_rating = 0.0, luck = 0.0) {
        this.#current_hp = max_hp;
        this.#max_hp = max_hp;
        this.#default_atk = default_atk;
        this.#atk_rating = atk_rating;
        this.#defense_rating = defense_rating;
        this.#luck = luck;
        this.#applyAtkRange(); // 초기화 시 공격 범위 설정
    }

    // Getter methods
    get current_hp() {
        return this.#current_hp;
    }

    get max_hp() {
        return this.#max_hp;
    }


    get default_atk() {
        return this.#default_atk;
    }

    get atk_rating() {
        return this.#atk_rating;
    }

    get defense_rating() {
        return this.#defense_rating;
    }

    get atk_range() {
        return this.#atk_range;
    }

    get luck(){
        return this.#luck;
    }

    modifyLuck(delta){
        this.#luck = MyMath.Clamp(this.#luck + delta, Number.MIN_VALUE, Number.MAX_VALUE);
    }

    modifyCurrentHP(delta) {
        this.#current_hp = MyMath.Clamp(this.#current_hp + delta, 0, this.#max_hp) | 0;
    }

    modifyMaxHP(delta) {
        this.#max_hp = MyMath.Clamp(this.#max_hp + delta, 0) | 0;
        if (this.#current_hp > this.#max_hp) {
            this.#current_hp = this.#max_hp;
        }
    }

    modifyDefaultAtk(delta) {
        this.#default_atk = MyMath.Clamp(this.#default_atk + delta, 0) | 0;
        this.#applyAtkRange();
    }

    modifyAtkRating(delta) {
        this.#atk_rating = MyMath.Clamp(this.#atk_rating + delta, 0);
        this.#applyAtkRange();
    }

    modifyDefenseRating(delta) {
        this.#defense_rating = MyMath.Clamp(this.#defense_rating + delta, 0);
    }

    #applyAtkRange() {
        this.#atk_range.min_atk = this.#default_atk;
        this.#atk_range.max_atk = this.#default_atk * (1.0 + this.#atk_rating ) | 0;
    }
}

export default Stats;
