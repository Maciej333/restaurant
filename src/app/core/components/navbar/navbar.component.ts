import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAuthorComponent } from '../dialog-author/dialog-author.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent{

  appName: string = "Fantastic restaurant and recipes to find there";

  constructor(private matDialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      firstName: 'Maciej',
      lastName: 'Rogowski'
    };
    this.matDialog.open(DialogAuthorComponent, dialogConfig);
  }
}
