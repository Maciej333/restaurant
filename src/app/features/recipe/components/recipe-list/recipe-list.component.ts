import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe';
import { RecipeComponentsComunicationService } from '../../services/recipe-components-comunication.service';
import { RecipeDataService } from '../../services/recipe-data.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit, OnDestroy {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  error$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  recipeList$: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  recipes: Recipe[] = [];

  fetchRecipesSubscription: Subscription = new Subscription();

  constructor(private recipeService: RecipeDataService, private router: Router, private recipeComponentComunication: RecipeComponentsComunicationService) { }

  ngOnInit(): void {
    this.fetchRecipesSubscription = this.recipeComponentComunication.fetchRecipes$.subscribe(data => {
      if(data){
        this.loadRecipes();
      }
    });
    this.loadRecipes();
  }

  loadRecipes(): void {
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
    );  }

  searchRecipe(event: KeyboardEvent): void {
    const searchValue: string = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    const filteredRecipes = this.recipes.filter(recipe => {
      if(recipe.name.toLocaleLowerCase().includes(searchValue)){
        return recipe;
      }
      for(let ingredient of recipe.ingredients){
        if(ingredient.name.toLocaleLowerCase().includes(searchValue)){
          return recipe;
        }
      }
      return null;
    })
    this.recipeList$.next(filteredRecipes);
  }

  showCreateRecipeForm(): void {
    this.router.navigateByUrl('/create/recipe');
    this.recipeComponentComunication.refreshForm();
  }

  ngOnDestroy(): void {
    this.fetchRecipesSubscription.unsubscribe();
  }
}
