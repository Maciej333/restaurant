import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogAuthorComponent } from './components/dialog-author/dialog-author.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    NavbarComponent,
    DialogAuthorComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  entryComponents: [
    DialogAuthorComponent
  ],
  exports: [
    NavbarComponent
  ],
})
export class CoreModule { }
