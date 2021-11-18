import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SoftwareListComponent } from "./software-list.component";
import { TabelasModule } from "src/app/shared/tabelas/tabelas.module";

@NgModule({
  declarations: [SoftwareListComponent],
  imports: [CommonModule, TabelasModule],
  exports: [SoftwareListComponent],
})
export class SoftwareListModule {}
