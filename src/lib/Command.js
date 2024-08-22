class Command {
    #commands = null;
    
    constructor() {
        this.#commands = new Map();
    }

    get commands() {
        return this.#commands;
    }

    get keys(){
        return this.#commands.keys();
    }

    get callbacks(){
        return this.#commands.values();
    }

    /** 명령어를 저장합니다. */
    AddCommand(key, callback) {
        if (typeof key !== 'string' || key.trim() === '') {
            throw new Error('Key must be a non-empty string');
        }
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }
        this.#commands.set(key, callback);
        return true;
    }

    /** 명령어를 제거합니다. */
    RemoveCommand(key) {
        if (!this.#commands.has(key)) {
            return false;
        }
        this.#commands.delete(key);
        return true;
    }

    /** 해당 명령어를 실행합니다. */
    ExecuteCommand(key, ...args) {
        const command = this.#commands.get(key);
        if (command) {
            try {
                command(...args);
                return true;
            } catch (error) {
                throw new Error(`Error executing command "${key}":`, error);
            }
        } else {
          //  throw new Error(`Command with key "${key}" not found.`);
        }
        return false;
    }

}

export default Command;