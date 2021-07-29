import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe';
import { RecipeDataService } from '../../services/recipe-data.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit {

  recipe$: BehaviorSubject<Recipe> = new BehaviorSubject<Recipe>({
    name: '',
    preparationTimeInMinutes: 0,
    description: '',
    ingredients: []
  })

  constructor(private recipeService: RecipeDataService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params => {
        if(params?.id){
          this.fetchRecipeData(params?.id);
        }
      }
    )
  }

  fetchRecipeData(id: string): void {
    this.recipeService.getRecipe(id).subscribe(
      recipe => {
        this.recipe$.next(recipe);
      }
    );
  }

}
