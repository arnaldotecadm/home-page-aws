import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { environment } from "../environments/environment";
import { UserService } from "./core/user/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "home-page-aws";

  constructor(private userService: UserService, private router : Router) {}

  ngOnInit() {
    firebase.default.initializeApp(environment.firebaseConfig);
  }

  logout() {
    this.userService.logout();
  }

  isLoggedIn(): boolean {
    return this.userService.isLogged();
  }

  goHome(){
    this.router.navigate(["inicio"]);
  }
}
