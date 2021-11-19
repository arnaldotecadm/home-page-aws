import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { environment } from "../environments/environment";
import { UserService } from "./core/user/user.service";
import { LoadingService } from "./services/loading-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "home-page-aws";

  constructor(
    private userService: UserService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    firebase.default.initializeApp(environment.firebaseConfig);
    this.loadingService.start();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["inicio"]);
  }

  isLoggedIn(): boolean {
    return this.userService.isLogged();
  }

  goHome() {
    this.router.navigate(["inicio"]);
    this.loadingService.start();
  }

  goToSoftwares() {
    this.router.navigate(["softwares"]);
    if (!this.userService.isLogged()) {
      this.loadingService.start();
    } else{
      this.loadingService.stop()
    }
  }
}
