import fs  from 'fs';
import csv from 'csv-parser';
import chalk from 'chalk';
import Singleton from './Singleton.js';

class TextTable extends Singleton {
  #textTable;
  constructor() {
    super();
    this.#textTable = {};
  }

  // CSV 파일을 비동기로 읽어오는 메서드
  async Load(filePath) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          this.#textTable[row.id] = row.text.replace(/^"|"$/g, '');
        })
        .on('end', () => {
        //  console.log('CSV file successfully processed.');
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  // 텍스트를 포맷팅하고 색상 적용하는 메서드
  FormatText(id, variables = {}) {
    if (!this.#textTable[id]) {
      return 'Text not found';
    }

    let text = this.#textTable[id];

    // 텍스트 내 변수 치환
    for (let key in variables) {
      text = text.replace(`{{${key}}}`, variables[key]);
    }

    // 텍스트에서 색상 적용 부분 파싱 및 적용
    text = text.replace(/{(.*?):(.*?)}/g, (match, color, content) => {
      // 내용이 또 다른 변수일 경우 변수 치환
      if (content in variables) {
        content = variables[content];
      }
      // 색상 적용
      return chalk[color](content);
    });

    return text.replace(/\\n/g, '\n');;
  }
}


export default new TextTable();;
