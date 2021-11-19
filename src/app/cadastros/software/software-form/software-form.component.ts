import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { SoftwareService } from "src/app/services/software.service";

@Component({
  selector: "app-software-form",
  templateUrl: "./software-form.component.html",
  styleUrls: ["./software-form.component.css"],
})
export class SoftwareFormComponent implements OnInit, OnDestroy {
  @ViewChild("formSoftware") ngForm: NgForm;

  identifier: string;
  obj$: Observable<any>;
  formulario: FormGroup;
  subscription;

  todasTurmas$: Observable<any>;

  constructor(
    private service: SoftwareService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.carregarDados();

    this.subscription = this.router.events.subscribe(() => {
      this.carregarDados();
    });
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
      }
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
    if (this.identifier != "0") {
      this.service
        .updateRegistro(this.identifier, this.formulario.getRawValue())
        .then(() => {
          this.carregarDados();
        });
    } else {
      this.service
        .salvarRegistro(this.formulario.getRawValue())
        .then((data) => {
          this.ngForm.resetForm();
          this.router.navigate(["software/" + data.id]);
          this.identifier = data.id;
        });
    }
  }

  private construirFormulario() {
    this.formulario = this.formBuilder.group({
      documentId: [{ value: "", disabled: true }],
      brief: [],
      consideration: [],
      facebook: [],
      google:[],
      twitter:[],
      image: [],
      inMaintenance: [],
      name: [],
      nickname: [],
      urlApp: [],
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
