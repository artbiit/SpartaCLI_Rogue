class Utils {
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Utils;