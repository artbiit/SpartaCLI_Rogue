import Stats from "./Stats.js";
import * as Actions from './Action.js';

class Unit {
    #name = '';
    #stats = null;
    #actions = [];

    get name(){
        return this.#name;
    }

    get stats(){
        return this.#stats;
    }

    constructor(name = 'UNKNOWN', stats = null){
        this.#name = name;
        this.#stats = (stats === null ? new Stats() : stats);
        this.#actions = [new Actions.AttackAction(), new Actions.DoubleAttackAction(), new Actions.TryHealAction()];
    }

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
