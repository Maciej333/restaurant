import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-author',
  templateUrl: './dialog-author.component.html',
  styleUrls: ['./dialog-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAuthorComponent {

  firstName: string = '';
  lastName: string = '';

  constructor(private dialogRef: MatDialogRef<DialogAuthorComponent>, @Inject(MAT_DIALOG_DATA) dialogData: {firstName: string, lastName: string} ) {
    this.firstName = dialogData.firstName;
    this.lastName = dialogData.lastName;
  }

  close() {
    this.dialogRef.close();
  }

}
