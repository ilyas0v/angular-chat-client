import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    title = 'ChatAppClient';

    private messages = 
	[
        {
            content: 'Test',
            time: '17:00',
			my: 1,
			isImage: false
        },
        {
			content: 'Test',
			time: '17:00',
			my: 0,
			isImage: false
        },
        {
			content: 'Test',
			time: '17:00',
			my: 0,
			isImage: false
        }
    ];

	public message = '';
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
			if(this.message.trim().length > 0)
			{
				this.messages.push({
					content: this.message.trim(),
					time: this.getCurrentTime(),
					my: 1,
					isImage: false
				});
	
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
		this.messages.push({
			content: this.imagePreviewSrc,
			time: this.getCurrentTime(),
			my: 1,
			isImage: true
		});

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
}
