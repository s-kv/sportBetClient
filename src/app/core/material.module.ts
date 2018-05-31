import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatListModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatListModule,
    MatDialogModule, MatTableModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule],
  exports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatListModule,
    MatDialogModule, MatTableModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule],
})
export class CustomMaterialModule { }
