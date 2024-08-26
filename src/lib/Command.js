/**
 * 명령어와 그에 따른 콜백을 관리하는 클래스입니다.
 */
class Command {
  #commands = null;

  constructor() {
    this.#commands = new Map();
  }

  /** @returns {Map} 명령어와 콜백이 저장된 맵 */
  get commands() {
    return this.#commands;
  }

  /** @returns {Iterator} 명령어의 키들 */
  get keys() {
    return this.#commands.keys();
  }

  /** @returns {Iterator} 콜백 함수들 */
  get callbacks() {
    return this.#commands.values();
  }

  /**
   * 명령어를 추가합니다.
   * @param {string} key 명령어 키
   * @param {Function} callback 명령어 실행 시 호출될 콜백 함수
   * @returns {boolean} 추가 성공 여부
   * @throws {Error} 유효하지 않은 키나 콜백 함수일 경우 예외를 발생시킵니다.
   */
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

  /**
   * 명령어를 제거합니다.
   * @param {string} key 제거할 명령어 키
   * @returns {boolean} 제거 성공 여부
   */
  RemoveCommand(key) {
    if (!this.#commands.has(key)) {
      return false;
    }
    this.#commands.delete(key);
    return true;
  }

  /**
   * 특정 인덱스에 명령어를 삽입합니다.
   * @param {string} key 명령어 키
   * @param {Function} callback 명령어 실행 시 호출될 콜백 함수
   * @param {number} index 삽입할 인덱스 위치
   * @returns {boolean} 삽입 성공 여부
   * @throws {Error} 유효하지 않은 키, 콜백 함수, 또는 인덱스일 경우 예외를 발생시킵니다.
   */
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

  /**
   * 주어진 키의 명령어를 실행합니다.
   * @param {string} key 실행할 명령어 키
   * @param {...any} args 콜백 함수에 전달할 인수들
   * @returns {Promise<*>} 콜백 함수의 반환 값
   * @throws {Error} 명령어 실행 중 발생한 예외를 전달합니다.
   */
  async ExecuteCommand(key, ...args) {
    const command = this.#commands.get(key);
    if (command) {
      try {
        return await command(...args);
      } catch (error) {
        throw new Error(`Error executing command "${key}":`, error);
      }
    }
    return false;
  }
}

export default Command;
