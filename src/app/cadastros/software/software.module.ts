import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SoftwareListModule } from "./software-list/software-list.module";
import { SoftwareListComponent } from "./software-list/software-list.component";
import { SoftwareFormModule } from "./software-form/software-form.module";
import { SoftwareFormComponent } from "./software-form/software-form.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, SoftwareListModule, SoftwareFormModule],
  exports: [SoftwareListComponent, SoftwareFormComponent],
})
export class SoftwareModule {}
