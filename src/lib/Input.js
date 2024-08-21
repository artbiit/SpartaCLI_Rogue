import readlineSync from 'readline-sync';
import fs from 'fs';
//OS에 따라선  readlineSync가 출력한 텍스트에 인코딩이 문제가 발생할 수 있으므로 따로 래핑했습니다.

class Input {
    constructor() {
      throw new Error('This class cannot be instantiated.');
    }
  

    static question(query, options) {
      process.stdout.write(query); 
      return readlineSync.question(query, options);
    }
  
    static keyIn(query, options) {
      process.stdout.write(query);
      return readlineSync.keyIn('', options);
    }
  
    static questionInt(query, options) {
      process.stdout.write(query);
      return readlineSync.questionInt('', options);
    }
  
    static questionFloat(query, options) {
      process.stdout.write(query);
      return readlineSync.questionFloat('', options);
    }
  
    static questionNewPassword(query, options) {
      process.stdout.write(query);
      return readlineSync.questionNewPassword('', options);
    }
  
    static keyInYN(query) {
      process.stdout.write(query);
      return readlineSync.keyInYN('');
    }
  
    static keyInYNStrict(query) {
      process.stdout.write(query);
      return readlineSync.keyInYNStrict('');
    }
  
    static keyInSelect(items, query, options) {
      process.stdout.write(query);
      return readlineSync.keyInSelect(items, '', options);
    }
  
    static keyInPause(query) {
      process.stdout.write(query);
      return readlineSync.keyInPause('');
    }
  
    static keyInContinue(query, options) {
      process.stdout.write(query);
      return readlineSync.keyInContinue('', options);
    }
  
    static prompt(query, options) {
      process.stdout.write(query);
      return readlineSync.prompt('', options);
    }
  }
  

export default Input;
