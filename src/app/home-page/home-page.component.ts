import { Component, OnInit } from "@angular/core";
import { AplicativoService } from "./home-page.service";
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { SoftwareInterface } from "./software.interface";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  constructor(
    private service: AplicativoService,
    private sanitizer: DomSanitizer
  ) {}

  softwares$ = new Observable();

  ngOnInit(): void {
    this.softwares$ = this.service.getAllSoftwares();
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(
      "data:image/png;base64, " + url
    );
  }

  public openLocation(software: SoftwareInterface) {
    if (software.inMaintenance) {
      alert(
        "Software se encontra em manutenção, por favor tente novamente mais tarde."
      );
    } else if (!software.urlApp) {
      alert(
        "Software se encontra apenas em ambiente de homologação. Por favor entre em contato conosco para maiores informações."
      );
    } else {
      window.open(software.urlApp, software.urlApp);
    }
  }
}
