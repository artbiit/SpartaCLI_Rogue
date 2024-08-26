import TextTable from '../lib/TextTable.js';
import MyMath from '../lib/MyMath.js';

const ACTION_FAILED = 'action_failed';

/**
 * 게임에서 모든 행동의 기본 클래스입니다.
 * 각 행동은 이름, 설명, 성공 확률을 가집니다.
 */
class Action {
    _name = "";
    _description = "";
    _probability = 0.0; // 확률이 낮을수록 성공 확률이 높습니다.

    /**
     * Action 클래스의 생성자입니다.
     * @param {string} name 행동의 이름
     * @param {string} description 행동에 대한 설명
     * @param {number} probability 행동의 성공 확률
     */
    constructor(name, description, probability) {
        this._name = name;
        this._description = description;
        this._probability = probability;
    }

    /** @returns {string} 행동의 이름 */
    get name(){
        return this._name;
    }

    /** @returns {string} 행동의 설명 */
    get description(){
        return this._description;
    }

    /** @returns {number} 행동의 성공 확률 */
    get probability(){
        return this._probability;
    }

    /**
     * 이 메서드는 상속받는 클래스에서 구현되어야 하는 추상 메서드입니다.
     * @param {Unit} unit 행동을 수행하는 유닛
     * @param {Unit} target_unit 행동의 대상이 되는 유닛
     * @throws {Error} 추상 메서드가 호출되었을 때 발생합니다.
     */
    DoAction = (unit, target_unit) =>{
        throw new Error("This is abstract action.");
    }
}

/**
 * 공격 행동을 계산하는 함수입니다.
 * @param {Unit} unit 공격하는 유닛
 * @returns {number} 계산된 공격력
 */
const CalcAtk = (unit) =>{
    return MyMath.RandomRangeInt(unit.stats.atk_range.min_atk, unit.stats.atk_range.max_atk+1);
}

/**
 * 피격 유닛의 방어력을 반영한 데미지를 계산합니다.
 * @param {Unit} target_unit 피격당하는 유닛
 * @param {number} atk 공격력
 * @returns {number} 계산된 데미지
 */
const CalcDamage = (target_unit, atk) => {
    return (atk * (1.0 - target_unit.stats.defense_rating)) | 0;
}

/**
 * 행동이 성공했는지 확률을 계산합니다.
 * @param {number} probability 행동의 기본 확률
 * @param {Unit} unit 행동을 수행하는 유닛
 * @returns {boolean} 성공 여부
 */
const CalcProbability = (probability , unit) =>{
    return MyMath.CalcProbability(probability + unit.stats.luck);
}

/**
 * 기본 공격 행동 클래스입니다.
 */
class AttackAction extends Action {
    /**
     * AttackAction 클래스의 생성자입니다.
     */
    constructor(){
        super("attack_action", 'damage', 0.0);
    }

    /**
     * 공격 행동을 수행합니다.
     * @param {Unit} unit 행동을 수행하는 유닛
     * @param {Unit} target_unit 행동의 대상이 되는 유닛
     * @returns {Array<string>} 행동 결과 설명
     */
    DoAction = (unit, target_unit) =>{
        let descriptions = [];

        const damage = CalcDamage(target_unit, CalcAtk(unit));
        target_unit.stats.modifyCurrentHP(-damage);
        descriptions.push( TextTable.FormatText(this._description, {unit: unit.name, target_unit: target_unit.name, damage}));
        return descriptions ;
    }
}

/**
 * 이중 공격 행동 클래스입니다.
 */
class DoubleAttackAction extends Action {
    /**
     * DoubleAttackAction 클래스의 생성자입니다.
     */
    constructor(){
        super("double_attack_action", 'damage', 0.55);
    }

    /**
     * 이중 공격 행동을 수행합니다.
     * @param {Unit} unit 행동을 수행하는 유닛
     * @param {Unit} target_unit 행동의 대상이 되는 유닛
     * @returns {Array<string>} 행동 결과 설명
     */
    DoAction = (unit, target_unit) => {
        let descriptions = [];
        if(CalcProbability(this._probability, unit)){
            for(let i = 0; i < 2; i++){
                const damage = CalcDamage(target_unit, CalcAtk(unit));
                target_unit.stats.modifyCurrentHP(-damage);            
                descriptions.push( TextTable.FormatText(this._description, {unit: unit.name, target_unit: target_unit.name, damage}));
            }
        } else {
            descriptions.push( TextTable.FormatText(ACTION_FAILED, {unit: unit.name, action_name: TextTable.FormatText( this._name)}));
        }
        return  descriptions ;
    }
}

/**
 * 치유 시도 행동 클래스입니다.
 */
class TryHealAction extends Action {
    /**
     * TryHealAction 클래스의 생성자입니다.
     */
    constructor(){
        super('try_heal_action', 'try_heal_result', 0.75);
    }

    /**
     * 치유 시도 행동을 수행합니다.
     * @param {Unit} unit 행동을 수행하는 유닛
     * @param {Unit} target_unit 행동의 대상이 되는 유닛
     * @returns {Array<string>} 행동 결과 설명
     */
    DoAction = (unit, target_unit) =>{
        let descriptions = [];
        const success = CalcProbability(this._probability, unit);
        const success_text = success ? '성공' : '실패';
        const prev_hp = unit.stats.current_hp;
        unit.stats.modifyCurrentHP(success ? (unit.stats.max_hp - prev_hp) * 0.5 : prev_hp * -0.1);
        const current_hp = unit.stats.current_hp;
        const text = TextTable.FormatText(this.description, {unit: unit.name, success: success_text, prev_hp, current_hp });
        descriptions.push(text);
        return  descriptions ;
    }
}

/**
 * 도박 행동 클래스입니다.
 */
class GamblingAction extends Action{
    /**
     * GamblingAction 클래스의 생성자입니다.
     */
    constructor(){
        super("gambling_action", 'gambling_result', 0.99);
    }

    /**
     * 도박 행동을 수행합니다.
     * @param {Unit} unit 행동을 수행하는 유닛
     * @param {Unit} target_unit 행동의 대상이 되는 유닛
     * @returns {Array<string>} 행동 결과 설명
     */
    DoAction = (unit, target_unit) =>{
        let descriptions = [];
        const success = CalcProbability(this._probability, unit);
        let text = '';
        if(success){
            text = TextTable.FormatText('gambling_success' );
            target_unit.stats.modifyCurrentHP(Number.MIN_SAFE_INTEGER);
        } else {
            text = TextTable.FormatText('gambling_failed' );
         
        }
        descriptions.push(text);
        return  descriptions ;
    }
}

export {Action, AttackAction, DoubleAttackAction, TryHealAction, GamblingAction };
