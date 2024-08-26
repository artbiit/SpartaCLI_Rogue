/**
 * 싱글톤 패턴을 구현한 기본 클래스입니다.
 * 이 클래스를 상속받으면 하나의 인스턴스만 생성됩니다.
 */
class Singleton {
  constructor() {
    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;
  }
}

export default Singleton;
