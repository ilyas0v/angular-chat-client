import { Component } from '@angular/core';
import * as moment from 'moment';
import { SocketioService } from './services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    title = 'ChatAppClient';

	constructor(private socketService: SocketioService) { }

	ngOnInit()
	{
		this.socketService.setupSocketConnection();
		this.socketService.getNewMessage().subscribe((message: any) => {
			if(message.sender && message.content)
			{
				this.messages.push({sender: message.sender, content: message.content, time: message.time, isImage: message.isImage, isSystemMessage: message.isSystemMessage});
				this.scrollToBottom();
			}
		})

		this.socketService.getUsersCount().subscribe((count: string) => {
			this.userCount = count;
		});

		this.nickname = localStorage.getItem('chat_nickname') || '';
	}

	ngOnDestroy()
	{
		this.socketService.disconnect();
	}

    private messages: any = 
	[
	
    ];

	public userCount = '0';

	public message = '';
	public nickname = '';
	public joined = false;
	public imagePreviewSrc: any = '';
	public openedImageSrc: any = '';

	public getCurrentTime() : string
	{
		return (moment(new Date())).format('HH:mm')
	}

    public getMessages()
    {
        return this.messages;
    }

    public onKeyUp(event: any)
    {
        if(event.key == 'Enter')
		{
			if(this.message.trim().length > 0 || this.nickname.length > 0)
			{
				this.socketService.emit('message', {sender: this.nickname, content: this.message});
				this.message = '';
			}
		}

		this.scrollToBottom();
    }

	public readURL(event: any): void
	{
		if (event.target.files && event.target.files[0])
		{
			const file = event.target.files[0];
			const reader = new FileReader();

			reader.onload = e => this.imagePreviewSrc = reader.result;
			reader.readAsDataURL(file);
		}
	}

	public cancelImageUpload(event: any): void 
	{
		this.imagePreviewSrc = '';
	}

	public sendImageUpload(event: any): void
	{
		this.socketService.emit('message', { sender: this.nickname, content: this.imagePreviewSrc, isImage: true});

		this.imagePreviewSrc = '';
		this.scrollToBottom();
	}

	public scrollToBottom(): void 
	{
		(document.getElementById('messages') || document.body).scrollTop = (document.getElementById('messages') || document.body).scrollHeight;
	}


	public openImage(src: string): void 
	{
		this.openedImageSrc = src;
	}

	public closeImage(): void 
	{
		this.openedImageSrc = '';
	}

	public joinChat()
	{
		var nickname = this.nickname.trim();

		if(nickname.length > 0)
		{
			this.socketService.emit('user_join', nickname);
			localStorage.setItem('chat_nickname', nickname);
			this.joined = true;
		}
	}
}
