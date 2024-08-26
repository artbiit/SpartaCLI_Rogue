/**
 * 다양한 유틸리티 함수를 제공하는 클래스입니다.
 */
class Utils {
    /**
     * 주어진 밀리초(ms) 동안 지연시킵니다.
     * @param {number} ms 지연시킬 시간 (밀리초)
     * @returns {Promise<void>} 지연이 완료된 후 반환되는 Promise
     */
    static Delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Utils;
