import { Component, NgZone, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";

@Component({
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private ngZone: NgZone,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.userService.isLogged()) {
      this.router.navigate(["inicio"]);
    } else {
      var config = {
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => this.goHome(authResult),
        },
        signInOptions: [
          //firebase.default.auth.EmailAuthProvider.PROVIDER_ID,
          //firebase.default.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.default.auth.GoogleAuthProvider.PROVIDER_ID,
          //firebase.default.auth.GithubAuthProvider.PROVIDER_ID,
        ],
        signInFlow: "popup",
      };

      let ui: any;

      if (firebaseui.auth.AuthUI.getInstance()) {
        ui = firebaseui.auth.AuthUI.getInstance();
      } else {
        ui = new firebaseui.auth.AuthUI(firebase.default.auth());
      }

      ui.start("#firebaseui-auth-container", config);
    }
  }

  goHome(authResult): boolean {
    authResult.user.getIdToken().then((token) => {
      localStorage.setItem(
        "isNewUser",
        authResult.additionalUserInfo.isNewUser
      );
      this.tokenService.setToken(token);
      this.tokenService.setRefreshToken(
        authResult.user.toJSON().stsTokenManager.refreshToken
      );
    });
    this.ngZone.run(() => {
      this.router.navigate(["inicio"]);
    });
    return false;
  }
}
