import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent {
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

			fetch("http://localhost:2324/login", requestOptions)
				.then(response => response.json())
				.then(result => {
					if (result.token) {
						document.cookie = "jwt=" + result.token
						localStorage.setItem("user", JSON.stringify(result.user))
						this.router.navigate(['']);
					} else {
						this.usernameError = result.message == "Username Not Found" ? result.message : "";
						this.passwordError = result.message == "Incorrect Password" ? result.message : "";
					}
				})
				.catch(error => console.log('error', error));
		}
	}

}
