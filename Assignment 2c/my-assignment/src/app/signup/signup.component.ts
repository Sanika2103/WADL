import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})

export class SignupComponent {
	usernameError: string = "";
	passwordError: string = "";

	constructor(private router: Router) { }


	async getData(username: any, password: any) {
		this.usernameError = username ? "" : "Username is required";
		this.passwordError = password ? "" : "Password is required";

		if (username && password) {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				"username": username,
				"password": password
			});

			var requestOptions: Object = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
			};

			fetch("http://localhost:2324/signup", requestOptions)
				.then(response => {
					if (response.ok) {
						return response.json();
					} else {
						this.usernameError = "Username Already Exists";
						throw Error("Not OK")
					}
				})
				.then(result => {
					if (result.token) {
						document.cookie = "jwt=" + result.token
						localStorage.setItem("user", JSON.stringify(result.user))
						this.router.navigate(['']);
					}
				})
				.catch(error => console.log('error', error));
		}
	}
}
