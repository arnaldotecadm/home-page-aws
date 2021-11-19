import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Subject } from "rxjs";
import { SoftwareInterface } from "../services/software.interface";
import { SoftwareService } from "../services/software.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(
    private service: SoftwareService,
    private sanitizer: DomSanitizer
  ) {}

  softwares$ = new Subject();
  subscription;

  ngOnInit(): void {
    this.subscription = this.service
      .getAllSoftwares()
      .subscribe((data: any) => {
        const objList = [];
        data.forEach((doc) => {
          let item = doc.payload.doc.data();
          item.identificacao = doc.payload.doc.id;
          objList.push(item);
        });
        this.softwares$.next(objList);
      });
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
