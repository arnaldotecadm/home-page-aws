import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SoftwareService } from "src/app/services/software.service";

@Component({
  selector: "app-software-list",
  templateUrl: "./software-list.component.html",
  styleUrls: ["./software-list.component.css"],
})
export class SoftwareListComponent implements OnInit {
  data$;
  itemSelecionado;

  botoes = [
    {
      nome: "excluir",
      acao: "excluir",
      icone: "apagar.svg",
      title: "Excluir Turma",
    },
  ];

  displayedColumns = [
    { head: "Nome", el: "name" },
    { head: "Apelido", el: "nickname" },
    { head: "Resumo", el: "brief" },
    { head: "Em Manutenção", el: "inMaintenance" },
    //{ head: "Url", el: "urlApp" },
  ];

  constructor(private router: Router, private service: SoftwareService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data$ = this.service.getAllSoftwares();
  }

  onRowSelect($event) {
    if (!$event) {
      return;
    }
    this.router.navigate(["alunos/aluno/" + $event.documentId]);
  }

  executarAcao(acaoPropagate) {
    this.itemSelecionado = acaoPropagate.item;
    switch (acaoPropagate.acao) {
      case "add-new":
        this.router.navigate(["alunos/aluno/0"]);
        break;
      case "excluir":
        this.excluirItem();
    }
  }

  excluirItem() {
    //this.service.deleteById(this.itemSelecionado.documentId).subscribe(() => this.loadData());
  }
}
