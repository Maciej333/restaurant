import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe';
import { RecipeComponentsComunicationService } from '../../services/recipe-components-comunication.service';
import { RecipeDataService } from '../../services/recipe-data.service';
import { RecipeDeleteDialogComponent } from '../recipe-list/recipe-delete-dialog/recipe-delete-dialog.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit {

  error$: BehaviorSubject<string> = new BehaviorSubject<string>('none');
  recipeId: string = '';
  recipe$: BehaviorSubject<Recipe> = new BehaviorSubject<Recipe>({
    name: '',
    preparationTimeInMinutes: 0,
    description: '',
    ingredients: []
  })

  constructor(private router: Router,private recipeService: RecipeDataService, private activeRoute: ActivatedRoute, private matDialog: MatDialog, private recipeComponentComunication: RecipeComponentsComunicationService ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params => {
        if(params?.id){
          this.recipeId = params.id;
          this.fetchRecipeData(params.id);
        }
      }
    )
  }

  fetchRecipeData(id: string): void {
    this.recipeService.getRecipe(id).subscribe(
      recipe => {
        this.recipe$.next(recipe);
        this.error$.next('none');
      },
      error => {
        this.error$.next(''+error);
      }
    );
  }

  showEditForm(): void {
    this.router.navigateByUrl(`/recipe/edit/${this.recipeId}`)
  }

  showDeleteDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose =  true;
    const dialogRef = this.matDialog.open(RecipeDeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.callDelete();
        }
      }
    )
  }

  callDelete(): void {
    this.recipeService.deleteRecipe(this.recipeId).subscribe(
      (data) => {
        this.recipeComponentComunication.fetchRecipes();
        this.router.navigateByUrl(`/recipe`);
      },
      (error) => {
        alert("server error cannot delete recipe");
      },
      () => {
        this.router.navigateByUrl('/recipe')
      }
    )
  }
}
