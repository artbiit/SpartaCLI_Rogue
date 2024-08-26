import crypto from 'crypto';

/**
 * 다양한 수학적 연산을 제공하는 유틸리티 클래스입니다.
 * 인스턴스를 생성할 수 없으며, 모든 메서드는 정적 메서드로 제공됩니다.
 */
class MyMath{

    constructor() {
        throw new Error('This class cannot be instantiated.');
      }

    /**
     * 입력된 값을 최소값과 최대값 사이로 고정합니다.
     * @param {number} value 고정할 값
     * @param {number} [min=Number.MIN_SAFE_INTEGER] 최소값
     * @param {number} [max=Number.MAX_SAFE_INTEGER] 최대값
     * @returns {number} 고정된 값
     */
    static Clamp(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER){
        if(value < min){
            return min;
        }else if(value > max){
            return max;
        }

        return value;
    }

    /**
     * 0과 1 사이의 무작위 수를 반환합니다.
     * @returns {number} 무작위 수
     */
    static Random01() {
        const randomBytes = crypto.randomBytes(4);
        const randomNumber = randomBytes.readUInt32BE(0);
        return randomNumber / 0xFFFFFFFF;
    }

    /**
     * 주어진 범위 내에서 무작위 수를 반환합니다.
     * @param {number} [min=Number.MIN_VALUE] 최소값
     * @param {number} [max=Number.MAX_VALUE] 최대값
     * @returns {number} 무작위 수
     */
    static RandomRange(min = Number.MIN_VALUE, max = Number.MAX_VALUE){
        if(min > max){
            const tmp = min;
            min = max;
            max = tmp;
        }

        return this.Random01() * (max - min) + min;
    }

    /**
     * 주어진 범위 내에서 무작위 정수를 반환합니다.
     * @param {number} [min=Number.MIN_VALUE] 최소값
     * @param {number} [max=Number.MAX_VALUE] 최대값
     * @returns {number} 무작위 정수
     */
    static RandomRangeInt(min = Number.MIN_VALUE, max = Number.MAX_VALUE){
        return this.Floor(this.RandomRange(min, max));
    }

    /**
     * 주어진 확률에 따라 성공 여부를 반환합니다.
     * @param {number} probability 확률 (0.0 ~ 1.0)
     * @returns {boolean} 성공 여부
     */
    static CalcProbability(probability){
        return this.Random01() > probability ;
    }

    /**
     * 배열 중 하나의 요소를 무작위로 선택하여 반환합니다.
     * @param {Array} array 선택할 배열
     * @returns {*} 선택된 요소
     */
    static RandomPick(array){
        return array[this.RandomPickIndex(array)];
    }

    /**
     * 배열 중 하나의 인덱스를 무작위로 선택하여 반환합니다.
     * @param {Array} array 선택할 배열
     * @returns {number} 선택된 인덱스
     */
    static RandomPickIndex(array){
        return this.RandomRangeInt(0, array.length);
    }

    /**
     * 주어진 수의 소수점을 제거하여 반환합니다.
     * @param {number} num 처리할 수
     * @returns {number} 소수점이 제거된 수
     */
    static Floor(num){
        return num | 0;
    }
}

export default MyMath;
