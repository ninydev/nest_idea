import {Injectable} from "@nestjs/common";
import {EventEmitter2} from "@nestjs/event-emitter";

@Injectable()
export class EventService {
    constructor(private readonly eventEmitter: EventEmitter2) {}

    emitEvent(eventName: string, eventData: any) {
        this.eventEmitter.emit(eventName, eventData);
    }

    subscribeToEvent(eventName: string, callback: (...args: any[]) => void) {
        this.eventEmitter.on(eventName, callback);
    }
}