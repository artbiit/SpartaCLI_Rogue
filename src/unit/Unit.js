import Stats from "./Stats";
import * as Actions from './Action';

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
        this.#stats = (stats === null ? new Stats() : structuredClone(stats));
        this.#actions = [new Actions.AttackAction(), new Actions.DoubleAttackAction(), new Actions.TryHealAction()];
    }

    AddAction(action){
    if (action == null) {
        throw new Error('Action cannot be null or undefined.');
    }

    if (!(action instanceof Action)) {
        throw new Error('Invalid action. Action must be an instance of the Action class.');
    }

    const existingAction = this.#actions.find(a => a.name === action.name);
    if (existingAction) {
        throw new Error(`Action with name "${action.name}" is already added.`);
    }

    this.#actions.push(action);
    }
}

export default Unit;
