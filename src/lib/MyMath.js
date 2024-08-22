import crypto from 'crypto';

class MyMath{

    constructor() {
        throw new Error('This class cannot be instantiated.');
      }

      /** 입력된 value값을 min ~ max값 사이로 고정해 반환합니다. */
    static Clamp(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER){
        if(value < min){
            return min;
        }else if(value > max){
            return max;
        }

        return value;
    }

    /** 0~1 사이로 값을 반환합니다. */
    static Random01() {
        const randomBytes = crypto.randomBytes(4);
        const randomNumber = randomBytes.readUInt32BE(0);
        return randomNumber / 0xFFFFFFFF;
    }

    /** min ~ max 사이로 값을 반환합니다. */
    static RandomRange(min = Number.MIN_VALUE, max = Number.MAX_VALUE){
        if(min > max){
            const tmp = min;
            min = max;
            max = tmp;
        }

        return this.Random01() * (max - min)+ min;
    }

    /** 소수점을 제거하고 반환합니다. */
    static RandomRangeInt(min = Number.MIN_VALUE, max = Number.MAX_VALUE){
        return this.RandomRange(min, max) | 0;
    }
}

export default MyMath;