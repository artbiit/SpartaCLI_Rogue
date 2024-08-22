import readline from 'readline';

class Input {
  constructor() {
    throw new Error('This class cannot be instantiated.');
  }

  static async question(query) {
    return await this._askQuestion(query);
  }

  static async questionInt(query) {
    const answer = await this._askQuestion(query);
    const intAnswer = parseInt(answer, 10);
    if (isNaN(intAnswer)) {
      throw new Error('Input is not a valid integer.');
    }
    return intAnswer;
  }

  static async questionFloat(query) {
    const answer = await this._askQuestion(query);
    const floatAnswer = parseFloat(answer);
    if (isNaN(floatAnswer)) {
      throw new Error('Input is not a valid float.');
    }
    return floatAnswer;
  }

  static async keyInYN(query) {
    const answer = await this._askQuestion(query);
    return answer.toLowerCase() === 'y';
  }

  static async keyInYNStrict(query) {
    const answer = await this._askQuestion(query);
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'n') {
      return answer.toLowerCase() === 'y';
    } else {
      throw new Error('Input must be Y or N.');
    }
  }

  static async keyInSelect(items, query) {
    const answer = await this._askQuestion(query + items.join(', ') + ': ');
    const index = parseInt(answer, 10);
    if (index >= 0 && index < items.length) {
      return index;
    }
    return -1;
  }

  static _askQuestion(query) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }
}

export default Input;
