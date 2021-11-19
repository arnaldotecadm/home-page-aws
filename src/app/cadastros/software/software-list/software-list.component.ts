import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { SoftwareService } from "src/app/services/software.service";

@Component({
  selector: "app-software-list",
  templateUrl: "./software-list.component.html",
  styleUrls: ["./software-list.component.css"],
})
export class SoftwareListComponent implements OnInit, OnDestroy {
  data$ = new Subject();
  itemSelecionado;
  subscription;

  botoes = [
    {
      nome: "excluir",
      acao: "excluir",
      icone: "apagar.svg",
      title: "Excluir Software",
    },
  ];

  displayedColumns = [
    { head: "Nome", el: "name" },
    { head: "Apelido", el: "nickname" },
    { head: "Resumo", el: "brief" },
    { head: "Em Manutenção", el: "inMaintenance" },
    //{ head: "Url", el: "urlApp" },
    { head: "Ações", el: "actions", botoes: this.botoes },
  ];

  constructor(private router: Router, private service: SoftwareService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.subscription = this.service
      .getAllSoftwares()
      .subscribe((data: any) => {
        const objList = [];
        data.forEach((doc) => {
          let item = doc.payload.doc.data();
          item.documentId = doc.payload.doc.id;
          objList.push(item);
        });
        this.data$.next(objList);
      });
  }

  onRowSelect($event) {
    if (!$event) {
      return;
    }
    this.router.navigate(["software/" + $event.documentId]);
  }

  executarAcao(acaoPropagate) {
    this.itemSelecionado = acaoPropagate.item;
    switch (acaoPropagate.acao) {
      case "add-new":
        this.router.navigate(["software/0"]);
        break;
      case "excluir":
        this.excluirItem();
    }
  }

  excluirItem() {
    if(confirm("Deseja realmente excluir este registro?")) {
      this.service.deleteById(this.itemSelecionado.documentId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
