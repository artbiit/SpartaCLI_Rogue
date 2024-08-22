class Utils {
    static Delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


   static FormatTextForConsole(inputText, spacing = 60) {
    const lines = inputText.split('\n');

    return lines.map(line => {
        // @로 분할하여 왼쪽과 오른쪽 텍스트로 나누기
        const [left, right] = line.split('@');

        if (!right) {
            return left; // @가 없으면 그대로 반환
        }

        // 공백의 길이를 계산 (지정된 간격에서 왼쪽 텍스트 길이를 뺀 값)
        const spaces = ' '.repeat(Math.max(spacing - left.length, 1));

        // 왼쪽 텍스트 + 공백 + 오른쪽 텍스트
        return left + spaces + right;
    }).join('\n');
}
    
}

export default Utils;