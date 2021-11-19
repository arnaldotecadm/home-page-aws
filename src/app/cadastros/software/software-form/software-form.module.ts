import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { SoftwareFormComponent } from "./software-form.component";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [SoftwareFormComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  exports: [SoftwareFormComponent],
})
export class SoftwareFormModule {}
