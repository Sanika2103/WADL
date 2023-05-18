import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	message: string

	constructor(private cookieService: CookieService, private router: Router) {
		let user: string = localStorage.getItem("user") ?? "{}";
		const userDetails = JSON.parse(user)
		this.message = userDetails.username ? "Hello " + userDetails.username : "LOGIN";
		this.validate()
	}

	validate() {
		// verify
		const jwt = this.cookieService.get('jwt');
		console.log(jwt)
		const myHeaders = new Headers({
			'Content-Type': 'application/json',
			'Cookie': `jwt=${jwt}`
		});


		var requestOptions: Object = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
			credentials: 'include'
		};

		fetch("http://localhost:2324", requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error(String(response.status));
				}
				return response.json();
			})
			.then(result => {
				console.log(result)
				if (result.message == "Token is not valid") {
					// redirect to login
					localStorage.removeItem("user")
					this.router.navigate(['/login']);
				}
				else if (result.message == "Token is not provided") {
					// redirect to login
					localStorage.removeItem("user")
					this.router.navigate(['/login']);
				}
				if (this.message == "LOGIN") {
					this.router.navigate(['/login']);
				}
			})
			.catch(error => console.log('error', error));
	}

	logout() {
		localStorage.removeItem("user")
		this.router.navigate(['/login']);
	}
}
