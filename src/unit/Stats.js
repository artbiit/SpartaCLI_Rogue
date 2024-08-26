import MyMath from "../lib/MyMath.js";

/**
 * 유닛의 스탯을 관리하는 클래스입니다.
 */
class Stats {
    #current_hp = 0;
    #max_hp = 0;
    #default_atk = 0;
    #atk_rating = 0.0;
    #defense_rating = 0.0;
    #atk_range = { min_atk: 0, max_atk: 0 };
    #luck = 0.0;

    /**
     * Stats 클래스의 생성자입니다.
     * @param {number} max_hp 최대 HP
     * @param {number} default_atk 기본 공격력
     * @param {number} atk_rating 공격 배율
     * @param {number} defense_rating 방어 배율
     * @param {number} luck 행운 수치
     */
    constructor(max_hp = 100, default_atk = 10, atk_rating = 0.1, defense_rating = 0.0, luck = 0.0) {
        this.#current_hp = max_hp;
        this.#max_hp = max_hp;
        this.#default_atk = default_atk;
        this.#atk_rating = atk_rating;
        this.#defense_rating = defense_rating;
        this.#luck = luck;
        this.#applyAtkRange(); // 초기화 시 공격 범위 설정
    }

    /** @returns {number} 현재 HP */
    get current_hp() {
        return this.#current_hp;
    }

    /** @returns {number} 최대 HP */
    get max_hp() {
        return this.#max_hp;
    }

    /** @returns {number} 기본 공격력 */
    get default_atk() {
        return this.#default_atk;
    }

    /** @returns {number} 공격 배율 */
    get atk_rating() {
        return this.#atk_rating;
    }

    /** @returns {number} 방어 배율 */
    get defense_rating() {
        return this.#defense_rating;
    }

    /** @returns {Object} 공격 범위 {min_atk: number, max_atk: number} */
    get atk_range() {
        return this.#atk_range;
    }

    /** @returns {number} 행운 수치 */
    get luck(){
        return this.#luck;
    }

    /**
     * 행운 수치를 변경합니다.
     * @param {number} delta 행운 수치의 변화량
     */
    modifyLuck(delta){
        this.#luck = MyMath.Clamp(this.#luck + delta, Number.MIN_VALUE, Number.MAX_VALUE);
    }

    /**
     * 현재 HP를 변경합니다.
     * @param {number} delta HP의 변화량
     */
    modifyCurrentHP(delta) {
        this.#current_hp = MyMath.Clamp(this.#current_hp + delta, 0, this.#max_hp) | 0;
    }

    /**
     * 최대 HP를 변경합니다.
     * @param {number} delta 최대 HP의 변화량
     */
    modifyMaxHP(delta) {
        this.#max_hp = MyMath.Clamp(this.#max_hp + delta, 0) | 0;
        if (this.#current_hp > this.#max_hp) {
            this.#current_hp = this.#max_hp;
        }
    }

    /**
     * 기본 공격력을 변경합니다.
     * @param {number} delta 기본 공격력의 변화량
     */
    modifyDefaultAtk(delta) {
        this.#default_atk = MyMath.Clamp(this.#default_atk + delta, 0) | 0;
        this.#applyAtkRange();
    }

    /**
     * 공격 배율을 변경합니다.
     * @param {number} delta 공격 배율의 변화량
     */
    modifyAtkRating(delta) {
        this.#atk_rating = MyMath.Clamp(this.#atk_rating + delta, 0);
        this.#applyAtkRange();
    }

    /**
     * 방어 배율을 변경합니다.
     * @param {number} delta 방어 배율의 변화량
     */
    modifyDefenseRating(delta) {
        this.#defense_rating = MyMath.Clamp(this.#defense_rating + delta, 0);
    }

    /**
     * 공격 범위를 적용합니다.
     * 기본 공격력과 공격 배율에 따라 최소 및 최대 공격력을 설정합니다.
     */
    #applyAtkRange() {
        this.#atk_range.min_atk = this.#default_atk;
        this.#atk_range.max_atk = this.#default_atk * (1.0 + this.#atk_rating ) | 0;
    }
}

export default Stats;
