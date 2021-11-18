import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SoftwareListComponent } from "./cadastros/software/software-list/software-list.component";
import { AuthGuard } from "./core/auth/auth.guard";
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
    path: "softwares",
    component: SoftwareListComponent,
    canActivate: [AuthGuard],
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
