import EventEmitter from 'events';

/**
 * 이벤트를 발행하고 구독하는 이벤트 버스입니다.
 * 이를 통해 모듈 간에 이벤트를 전달할 수 있습니다.
 */
const eventBus = new EventEmitter();

export default eventBus;
