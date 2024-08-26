import fs  from 'fs';
import csv from 'csv-parser';
import chalk from 'chalk';
import Singleton from './Singleton.js';

/**
 * 텍스트 데이터를 관리하고, 콘솔에 출력하기 위한 유틸리티 클래스입니다.
 * 싱글톤 패턴을 사용하여 하나의 인스턴스만 존재합니다.
 */
class TextTable extends Singleton {
  #textTable;
  constructor() {
    super();
    this.#textTable = {};
  }

  /**
   * CSV 파일을 읽어 텍스트 테이블을 로드합니다.
   * 이 메서드를 호출한 후에 다른 메서드를 사용해야 합니다.
   * @param {string} filePath CSV 파일 경로
   * @returns {Promise<void>}
   */
  async Load(filePath) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          try{
            this.#textTable[row.id] = row.text.trim().replace(/^"|"$/g, '').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
          }catch{
            console.error(row);
          }
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  /**
   * 주어진 id에 해당하는 텍스트를 변수 치환을 포함하여 포맷팅합니다.
   * @param {string} id 텍스트 id
   * @param {Object} variables 텍스트 내 치환할 변수들
   * @returns {string} 포맷된 텍스트
   */
  FormatText(id, variables = {}) {
    if (!this.#textTable[id]) {
      return 'Text not found';
    }

    let text = this.#textTable[id];

    // 텍스트 내 변수 치환
    for (let key in variables) {
        const variablePattern = new RegExp(`{{${key}}}`, 'g');
        text = text.replace(variablePattern, variables[key]);
    }

    // 텍스트에서 색상 적용 부분 파싱 및 적용
    text = text.replace(/{(.*?):(.*?)}/gs, (match, color, content) => {
        return chalk[color](content);
    });

    return text;
  }

  /**
   * 주어진 id에 해당하는 텍스트를 포맷팅한 후 콘솔에 출력합니다.
   * @param {string} id 텍스트 id
   * @param {Object} variables 텍스트 내 치환할 변수들
   */
  Output(id, variables = {}) {
    console.log(this.FormatText(id, variables));
  }

  /**
   * @ 문자를 기준으로 텍스트를 일정 간격으로 정렬합니다.
   * @param {string} inputText 입력 텍스트
   * @param {number} [spacing=60] 좌우 텍스트 간격
   * @returns {string} 정렬된 텍스트
   */
  FormatTextForConsole(inputText, spacing = 60) {
    const lines = inputText.split('\n');

    return lines.map(line => {
        const [left, right] = line.split('@');

        if (!right) {
            return left;
        }

        const spaces = ' '.repeat(Math.max(spacing - left.length, 1));

        return left + spaces + right;
    }).join('\n');
  }
}

const textTable = new TextTable();
export default  textTable;
