import { Component } from "@angular/core";
import * as firebase from "firebase/app";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "home-page-aws";

  ngOnInit() {
    firebase.default.initializeApp(environment.firebaseConfig);
  }
}
