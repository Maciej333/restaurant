import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-delete-dialog',
  templateUrl: './recipe-delete-dialog.component.html',
  styleUrls: ['./recipe-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDeleteDialogComponent {

  constructor(private dialogRef: MatDialogRef<RecipeDeleteDialogComponent>) { }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
