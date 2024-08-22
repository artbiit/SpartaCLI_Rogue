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

  /** CSV를 읽어옵니다. 사용하기전에 이것을 먼저 해야합니다. */
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
        //  console.log('CSV file successfully processed.');
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  /** id에 해당하는 텍스트를 포맷합니다. */
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


  /** 포맷후 바로 출력합니다. */
  Output(id, variables = {}){
    console.log(this.FormatText(id, variables));
  }
}


export default new TextTable();;
