import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Message } from '../model/message';
import { Event } from '../model/datamodel';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3002';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
