import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./core/signin/signin.component";
import { HomePageComponent } from "./home-page/home-page.component";

const routes: Routes = [
  {
    path: "sigin-in",
    component: SigninComponent,
  },

  {
    path: "inicio",
    component: HomePageComponent,
  },

  {
    path: "**",
    redirectTo: "inicio",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
