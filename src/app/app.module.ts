import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SoftwareModule } from "./cadastros/software/software.module";
import { CurrencyPipe, DecimalPipe } from "@angular/common";

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    SoftwareModule,
  ],
  providers: [DecimalPipe, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
