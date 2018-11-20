import { NgModule } from "@angular/core";

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBar,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from "@angular/material";

const MATERIAL_COMPONENTS = [
  MatChipsModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatTableModule,
];

@NgModule({
  imports: MATERIAL_COMPONENTS,
  exports: MATERIAL_COMPONENTS,
  providers: [
    MatSnackBar,
  ],
})
export class MaterialModule {
}
