import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Recipe } from 'src/app/core/models/recipe';
import { RecipeDataService } from '../../services/recipe-data.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  error$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  recipeList$: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeDataService) { }

  ngOnInit(): void {
    this.loading$.next(true);
    this.recipeService.getRecipes()
    .subscribe(
      recipes => {
        this.recipes = recipes;
        this.recipeList$.next(this.recipes);
        this.loading$.next(false);
      },
      error => {
        this.error$.next(error);
        this.loading$.next(false);
      }
    );
  }

  searchRecipe(event: KeyboardEvent): void {
    const filteredRecipes = this.recipes.filter(recipe => {
      if(recipe.name.toLocaleLowerCase().includes((event.target as HTMLInputElement).value.trim().toLocaleLowerCase())){
        return recipe;
      }
      return null;
    })
    this.recipeList$.next(filteredRecipes);
  }
}
