import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService
{

	public message$: BehaviorSubject<string> = new BehaviorSubject('');
	public userCount$: BehaviorSubject<string> = new BehaviorSubject('');

	socket: any;

	constructor() { }

	setupSocketConnection()
	{
		this.socket = io('http://localhost:3000');

		this.socket.on('message', (data: string) => {
			console.log(data);
		});
	}

	disconnect()
	{
		if(this.socket)
		{
			this.socket.disconnect();
		}
	}

	emit(eventName: string, data: any)
	{
		this.socket.emit(eventName, data);
	}


	getNewMessage = () => {
		this.socket.on('message', (message: string) => {
			this.message$.next(message);
		});

		return this.message$.asObservable();
	};

	getUsersCount = () => {
		this.socket.on('user_count', (count: string) => {
			this.userCount$.next(count);
		});

		return this.userCount$.asObservable();
	}
}
