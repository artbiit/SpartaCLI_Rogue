import Stats from "./Stats.js";
import * as Actions from './Action.js';

/**
 * 게임 내 유닛을 나타내는 클래스입니다.
 * 각 유닛은 이름, 스탯, 그리고 행동 리스트를 가집니다.
 */
class Unit {
    #name = '';
    #stats = null;
    #actions = [];

    /**
     * Unit 클래스의 생성자입니다.
     * @param {string} name 유닛의 이름
     * @param {Stats} stats 유닛의 스탯
     */
    constructor(name = 'UNKNOWN', stats = null){
        this.#name = name;
        this.#stats = (stats === null ? new Stats() : stats);
        this.#actions = [new Actions.AttackAction(), new Actions.DoubleAttackAction(), new Actions.TryHealAction()];
    }

    /** @returns {string} 유닛의 이름 */
    get name(){
        return this.#name;
    }

    /** @returns {Stats} 유닛의 스탯 */
    get stats(){
        return this.#stats;
    }

    /** @returns {Array<Action>} 유닛의 행동 리스트 */
    get actions(){
        return this.#actions;
    }

    /**
     * 유닛에 새로운 행동을 추가합니다.
     * @param {Action} action 추가할 행동
     * @param {number} index 행동을 추가할 위치 (-1일 경우 리스트 끝에 추가)
     * @throws {Error} 행동이 null이거나 유효하지 않은 경우, 혹은 같은 이름의 행동이 이미 존재할 경우 예외를 발생시킵니다.
     */
    InsertAction(action, index = -1){
        if (action == null) {
            throw new Error('Action cannot be null or undefined.');
        }

        if (!(action instanceof Actions.Action)) {
            throw new Error('Invalid action. Action must be an instance of the Action class.');
        }

        const existingAction = this.#actions.find(a => a.name === action.name);
        if (existingAction) {
            throw new Error(`Action with name "${action.name}" is already added.`);
        }

        if(index === -1){
            this.#actions.push(action);
        }else{
            this.#actions.splice(index, 0, action);
        }
    }
}

export default Unit;
