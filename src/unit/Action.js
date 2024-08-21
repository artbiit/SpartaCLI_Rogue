import TextTable from '../lib/TextTable';
import MyMath from '../lib/MyMath';

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

    DoAction(unit, target_unit){
        throw new Error("This is abstract action.");
    }
}

/**해당 유닛의 1회 공격에 대한 데미지를 계산합니다. */
function CalcAtk(unit){
    return Math.floor(Math.random() * (unit.stats.atk_range.max_atk - unit.stats.atk_range.min_atk + 1)) + unit.stats.atk_range.min_atk;
}

/** 입력된 공격력을 토대로 피격 유닛의 방어력을 적용한 값을 계산합니다. */
function CalcDamage(target_unit, atk){
    return Math.floor(atk * (1.0 - target_unit.stats.defense_rating));
}

/** 확률상 성공했는지 검사합니다. */
function CalcProbability(probability , unit){
    return MyMath.RandomFloat() < (probability - unit.stats.luck / 100.0);
}

class AttackAction extends Action {
    constructor(){
        super("attack_action", 'damage', 0.0);
    }

    DoAction(unit, target_unit){
        const damage = CalcDamage(target_unit, CalcAtk(unit));
        target_unit.stats.modifyCurrentHP(-damage);
        console.log(TextTable.FormatText(this._description, {unit: unit.name, target_unit: target_unit.name, damage}));
        return target_unit.stats.current_hp > 0;
    }
}

class DoubleAttackAction extends Action {
    constructor(){
        super("double_attack_action", 'damage', 0.75);
    }

    DoAction(unit, target_unit){
        if(CalcProbability(this._probability, unit)){
            for(let i = 0; i < 2; i++){
                const damage = CalcDamage(target_unit, CalcAtk(unit));
                target_unit.stats.modifyCurrentHP(-damage);
                console.log(TextTable.FormatText(this._description, {unit: unit.name, target_unit: target_unit.name, damage}));

                if(target_unit.stats.current_hp <= 0){
                    return false;
                }
            }
        } else {
            console.log(TextTable.FormatText(ACTION_FAILED, {action_name: this._name}));
        }
       
        return target_unit.stats.current_hp > 0;
    }
}

class TryHealAction extends Action {
    constructor(){
        super('try_heal_action', 'try_heal_result', 0.5);
    }

    DoAction(unit, target_unit){
        const success = CalcProbability(this._probability, unit);
        const success_text = success ? '성공' : '실패';
        const prev_hp = unit.stats.current_hp;
        unit.stats.modifyCurrentHP(success ? prev_hp * 1.5 : prev_hp * 0.9);
        const current_hp = unit.stats.current_hp;
        const text = TextTable.FormatText(this.description, {unit: unit.name, success: success_text, prev_hp, current_hp });
        console.log(text);
        return target_unit.stats.current_hp > 0;
    }
}

class GamblingAction extends Action{
    constructor(){
        super("gambling_action", 'gambling_result', 0.99);
    }

    DoAction(unit, target_unit){
        const success = CalcProbability(this._probability, unit);
        const success_text = success ? '성공' : '실패';
        const victory_text = success ? '승리' : '패배';
        const text = TextTable.FormatText(this.description, {success: success_text, victory: victory_text });
        console.log(text);
        if(success){
            target_unit.stats.modifyCurrentHP(Number.MIN_SAFE_INTEGER);
        } else {
            unit.stats.modifyCurrentHP(Number.MIN_SAFE_INTEGER);
        }
        return false;
    }
}

module.exports = {AttackAction, DoubleAttackAction, TryHealAction, GamblingAction};
