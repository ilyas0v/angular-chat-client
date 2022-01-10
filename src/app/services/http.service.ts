import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService
{
	public body: any;
	public baseUrl: string = 'http://localhost:3000';

	constructor() { }

	request(endpoint: string, method: string, data: any, callback: any = () => {})
	{
		var obj: any = {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		};

		if(method === 'POST')
		{
			obj['body'] = JSON.stringify(data);
		}

		fetch(`${this.baseUrl}/${endpoint}`, obj)
			.then((res:any) => {
				return res.json()
			})
			.then((res: any) => {
				callback(res);
			});
	}

}
