import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SoftwareListModule } from "./software-list/software-list.module";
import { SoftwareListComponent } from "./software-list/software-list.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, SoftwareListModule],
  exports: [SoftwareListComponent],
})
export class SoftwareModule {}
