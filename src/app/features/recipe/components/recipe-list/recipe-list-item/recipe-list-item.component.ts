import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe';
import { RecipeComponentsComunicationService } from '../../../services/recipe-components-comunication.service';
import { RecipeDataService } from '../../../services/recipe-data.service';
import { RecipeDeleteDialogComponent } from '../recipe-delete-dialog/recipe-delete-dialog.component';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListItemComponent {

  @Input() recipe: Recipe = {
    _id: '0',
    name: '',
    preparationTimeInMinutes: 0,
    description: '',
    ingredients: []
  };

  constructor(private matDialog: MatDialog, private router: Router, private recipeService: RecipeDataService, private recipeComponentComunication: RecipeComponentsComunicationService) { }

  showRecipe(): void {
    this.router.navigateByUrl(`/recipe/${this.recipe?._id}`)
  }

  editRecipe(event: Event): void {
    event.stopPropagation();
    this.router.navigateByUrl(`/recipe/edit/${this.recipe?._id}`)
  }

  deleteRecipe(event: Event): void {
    event.stopPropagation();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose =  true;
    const dialogRef = this.matDialog.open(RecipeDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.callDelete();
      }
    })
  }

  callDelete(): void {
    this.recipeService.deleteRecipe(this.recipe._id+"").subscribe(
      (data) => {
        this.recipeComponentComunication.fetchRecipes();
        this.router.navigateByUrl(`/recipe`);
      },
      (error) => {

      }
    )
  }

}
