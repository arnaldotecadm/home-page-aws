import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TabelaComponent } from "./tabela/tabela.component";
import { TabelaModule } from "./tabela/tabela.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, TabelaModule],
  exports: [TabelaComponent],
})
export class TabelasModule {}
