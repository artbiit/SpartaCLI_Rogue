class Command {
  #commands = null;

  constructor() {
    this.#commands = new Map();
  }

  get commands() {
    return this.#commands;
  }

  get keys() {
    return this.#commands.keys();
  }

  get callbacks() {
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

  /** 특정 인덱스에 명령어를 삽입합니다. */
  InsertCommandAt(key, callback, index) {
    if (typeof key !== 'string' || key.trim() === '') {
      throw new Error('Key must be a non-empty string');
    }
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    const keys = Array.from(this.#commands.keys());
    const values = Array.from(this.#commands.values());

    if (index < 0) {
      index = keys.length + index; // 끝에서 n번째
    }

    if (index < 0 || index > keys.length) {
      throw new Error('Index out of bounds');
    }

    keys.splice(index, 0, key);
    values.splice(index, 0, callback);

    this.#commands = new Map(keys.map((k, i) => [k, values[i]]));
    return true;
  }

  /** 해당 명령어를 실행합니다. */
  async ExecuteCommand(key, ...args) {
    const command = this.#commands.get(key);
    if (command) {
      try {
        return await command(...args);
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
