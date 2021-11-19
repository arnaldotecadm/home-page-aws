import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoadingService } from "src/app/services/loading-service";
import { SoftwareService } from "src/app/services/software.service";

@Component({
  selector: "app-software-form",
  templateUrl: "./software-form.component.html",
  styleUrls: ["./software-form.component.css"],
})
export class SoftwareFormComponent implements OnInit {
  @ViewChild("formSoftware") ngForm: NgForm;

  identifier: string;
  obj$: Observable<any>;
  formulario: FormGroup;
  imgContent;

  todasTurmas$: Observable<any>;

  constructor(
    private service: SoftwareService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.carregarDados();
  }

  get form(): NgForm {
    return this.ngForm;
  }

  carregarDados() {
    this.identifier = this.route.snapshot.paramMap.get("identificador");
    this.service.getById(this.identifier).subscribe((data: any) => {
      if (data) {
        this.formulario.patchValue(data);
        this.formulario.patchValue({ documentId: this.identifier });
        this.imgContent = this.getSantizeUrl(data.image)
      }
      
      this.loadingService.stop();
    });
  }

  voltar() {
    this.router.navigate(["softwares"]);
  }

  update() {
    Object.keys(this.formulario.controls).forEach((field) => {
      const control = this.formulario.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.formulario.invalid) {
      return;
    }

    this.loadingService.start();

    if (this.identifier != "0") {
      this.service
        .updateRegistro(this.identifier, this.formulario.getRawValue())
        .then(() => {
          this.voltar();
        });
    } else {
      this.service
        .salvarRegistro(this.formulario.getRawValue())
        .then((data) => {
          this.voltar();
        });
    }
  }

  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const imagem = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(imagem);
      reader.onload = () => {
        this.formulario.patchValue({ image: reader.result });
      };
    }
  }

  private construirFormulario() {
    this.formulario = this.formBuilder.group({
      documentId: [{ value: "", disabled: true }],
      brief: [],
      consideration: [],
      facebook: [],
      google: [],
      twitter: [],
      image: [],
      inMaintenance: [],
      name: [],
      nickname: [],
      urlApp: [],
    });
  }

  public getSantizeUrl(url: string) {
    if (!url) {
      return;
    }
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
