import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogAuthorComponent } from './components/dialog-author/dialog-author.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TimeTransformPipe } from './pipes/time-transform.pipe'


@NgModule({
  declarations: [
    NavbarComponent,
    DialogAuthorComponent,
    TimeTransformPipe
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
    NavbarComponent,
    TimeTransformPipe
  ],
})
export class CoreModule { }
