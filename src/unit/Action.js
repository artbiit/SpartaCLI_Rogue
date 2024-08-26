import TextTable from '../lib/TextTable.js';
import MyMath from '../lib/MyMath.js';

const ACTION_FAILED = 'action_failed';
/**행동의 기본틀 DoAction에서 false 반환시 전투 종료다. */
class Action {
    _name = "";
    _description = "";
    _probability = 0.0; // 0으로 갈수록 100%

    constructor(name, description, probability) {
        this._name = name;
        this._description = description;
        this._probability = probability;
    }

    get name(){
        return this._name;
    }

    get description(){
        return this._description;
    }

    get probability(){
        return this._probability;
    }

    DoAction = (unit, target_unit) =>{
        throw new Error("This is abstract action.");
    }
}

/**해당 유닛의 1회 공격에 대한 데미지를 계산합니다. */
const CalcAtk = (unit) =>{
    return MyMath.RandomRangeInt(unit.stats.atk_range.min_atk, unit.stats.atk_range.max_atk+1);
}

/** 입력된 공격력을 토대로 피격 유닛의 방어력을 적용한 값을 계산합니다. */
const CalcDamage = (target_unit, atk) => {
    return (atk * (1.0 - target_unit.stats.defense_rating)) | 0;
}

/** 확률상 성공했는지 검사합니다. */
 const CalcProbability = (probability , unit) =>{
    return MyMath.CalcProbability(probability + unit.stats.luck);
}

class AttackAction extends Action {
    constructor(){
        super("attack_action", 'damage', 0.0);
    }


    DoAction = (unit, target_unit) =>{
        let descriptions = [];

        const damage = CalcDamage(target_unit, CalcAtk(unit));
        target_unit.stats.modifyCurrentHP(-damage);
         descriptions.push( TextTable.FormatText(this._description, {unit: unit.name, target_unit: target_unit.name, damage}));
        return descriptions ;
    }
}

class DoubleAttackAction extends Action {
    constructor(){
        super("double_attack_action", 'damage', 0.55);
    }

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

class TryHealAction extends Action {
    constructor(){
        super('try_heal_action', 'try_heal_result', 0.75);
    }

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

class GamblingAction extends Action{
    constructor(){
        super("gambling_action", 'gambling_result', 0.99);
    }

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