class Utils {
    static Delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


   
}

export default Utils;