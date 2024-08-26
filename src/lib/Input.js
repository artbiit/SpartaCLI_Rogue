import readline from 'readline';

let createdReads = {};

/**
 * 콘솔 입력을 관리하는 클래스입니다.
 * 인스턴스를 생성할 수 없으며, 모든 메서드는 정적 메서드로 제공됩니다.
 */
class Input {
  constructor() {
    throw new Error('This class cannot be instantiated.');
  }

  /**
   * 사용자에게 질문하고 입력을 받습니다.
   * @param {string} query 질문 내용
   * @returns {Promise<string>} 사용자의 입력 값
   */
  static async question(query) {
    let text = await this._askQuestion(query);
    return text;
  }

  /**
   * 사용자에게 질문하고 정수를 입력받습니다.
   * @param {string} query 질문 내용
   * @returns {Promise<number>} 입력된 정수
   * @throws {Error} 입력 값이 유효한 정수가 아닐 경우 예외를 발생시킵니다.
   */
  static async questionInt(query) {
    const answer = await this._askQuestion(query);
    const intAnswer = parseInt(answer, 10);
    if (isNaN(intAnswer)) {
      throw new Error('Input is not a valid integer.');
    }
    return intAnswer;
  }

  /**
   * 사용자에게 질문하고 실수를 입력받습니다.
   * @param {string} query 질문 내용
   * @returns {Promise<number>} 입력된 실수
   * @throws {Error} 입력 값이 유효한 실수가 아닐 경우 예외를 발생시킵니다.
   */
  static async questionFloat(query) {
    const answer = await this._askQuestion(query);
    const floatAnswer = parseFloat(answer);
    if (isNaN(floatAnswer)) {
      throw new Error('Input is not a valid float.');
    }
    return floatAnswer;
  }

  /**
   * 사용자에게 예/아니오 질문을 하고 대답을 받습니다.
   * @param {string} query 질문 내용
   * @returns {Promise<boolean>} 'Y' 또는 '네'의 경우 true, 그 외의 경우 false
   */
  static async keyInYN(query) {
    const answer = (await this._askQuestion(query)).trim(); // 입력값의 공백을 제거
    return answer === '' || answer.toLowerCase() === '네' || answer.toLowerCase() === 'y';
  }

  /**
   * 사용자에게 엄격한 예/아니오 질문을 하고 대답을 받습니다.
   * @param {string} query 질문 내용
   * @returns {Promise<boolean>} 'Y' 또는 'N'으로 입력된 경우, 그에 맞는 boolean 값
   * @throws {Error} 입력 값이 'Y' 또는 'N'이 아닐 경우 예외를 발생시킵니다.
   */
  static async keyInYNStrict(query) {
    const answer = await this._askQuestion(query);
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'n') {
      return answer.toLowerCase() === 'y';
    } else {
      throw new Error('Input must be Y or N.');
    }
  }

  /**
   * 주어진 항목들 중에서 선택지를 받아옵니다.
   * @param {Array<string>} items 선택지 목록
   * @param {string} query 질문 내용
   * @returns {Promise<number>} 선택된 항목의 인덱스 (0부터 시작), 유효하지 않은 경우 -1 반환
   */
  static async keyInSelect(items, query) {
    const answer = await this._askQuestion(query + items.join(', ') + ': ');
    const index = parseInt(answer, 10);
    if (index >= 0 && index < items.length) {
      return index;
    }
    return -1;
  }

  /**
   * 내부적으로 질문을 처리하는 함수입니다.
   * @param {string} query 질문 내용
   * @returns {Promise<string>} 사용자의 입력 값
   * @private
   */
  static _askQuestion(query) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true 
    });

    createdReads[query] = rl;
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
      delete  createdReads[query];
        rl.close();
        resolve(answer);
      });
    });
  }
}

process.on('exit', () => {
  AllClose();
});

process.on('SIGINT', () => {
  AllClose();
  process.exit();
});

/**
 * 열린 모든 readline 인터페이스를 닫습니다.
 * @private
 */
function AllClose(){
  for(const key in createdReads){
    createdReads[key].close();
  }
  createdReads = {};
}

export default Input;
