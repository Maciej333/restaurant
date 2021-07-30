import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/core/models/ingredient';
import { Recipe } from 'src/app/core/models/recipe';
import { RecipeComponentsComunicationService } from '../../services/recipe-components-comunication.service';
import { RecipeDataService } from '../../services/recipe-data.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent implements OnInit, OnDestroy {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  message$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  refreshSubscription: Subscription = new Subscription();
  recipeForm: FormGroup = new FormGroup({});
  recipeId: string = '';
  fetchRecipe: Recipe = {
    name: '',
    preparationTimeInMinutes: 0,
    description: '',
    ingredients: []
  }
  constructor(private formBuilder: FormBuilder,private recipeService: RecipeDataService, private activeRoute: ActivatedRoute, private recipeComunicationService: RecipeComponentsComunicationService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if(params?.id){
        this.fetchRecipeData(params?.id);
        this.recipeId = params?.id;
      } else {
        this.createForm();
        this.recipeId = '';
      }
    });
    this.refreshSubscription = this.recipeComunicationService.refreshForm$.subscribe(data => {
      this.message$.next('');
    });
  }

  fetchRecipeData(id: string): void {
    this.loading$.next(true);
    this.recipeService.getRecipe(id).subscribe(
      recipe => {
        this.loading$.next(false);
        this.fetchRecipe = recipe;
        this.createForm(recipe.name, recipe.preparationTimeInMinutes, recipe.description, recipe.ingredients);
      },
      error => {
        this.loading$.next(false);
        this.message$.next('error fetch');
      }
    );
  }

  createForm(nameVar: string = '', preparationTimeVar: number = 0, descriptionVar: string = '', ingredientsVar: Ingredient[] = []): void {
    this.recipeForm = this.formBuilder.group({
      name: [
        nameVar,
        {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(80)]
        }
      ],
      preparationTime: [
        preparationTimeVar,
        {
          validators: [Validators.required]
        }
      ],
      description: [
        descriptionVar,
        {
          validators: [Validators.required, Validators.minLength(15), Validators.maxLength(155)]
        }
      ],
      ingredients: this.formBuilder.array(
        [],
        {
          validators: [Validators.required, Validators.minLength(2)]
        })
    });
    if(ingredientsVar.length > 0){
      for(let ingredient of ingredientsVar){
        this.addIngredient(ingredient.name, ingredient.quantity);
      }
    }
  }

  get name(): AbstractControl {
    return this.recipeForm.controls['name'];
  }

  get preparationTime(): AbstractControl {
    return this.recipeForm.controls['preparationTime'];
  }

  get description(): AbstractControl {
    return this.recipeForm.controls['description'];
  }

  get ingredients(): FormArray {
    return this.recipeForm.controls['ingredients'] as FormArray;
  }

  newIngredient(ingredientNameVar: string = '', ingredientQuantityVar: string = ''): FormGroup {
    return this.formBuilder.group({
      name: [
        ingredientNameVar,
        {
          validators: [Validators.required]
        }
      ],
      quantity: [
        ingredientQuantityVar,
        {
          validators: [Validators.required]
        }
      ]
    });
  }

  addIngredient(ingredientNameVar: string = '', ingredientQuantityVar: string = ''): void {
    this.ingredients.push(this.newIngredient(ingredientNameVar, ingredientQuantityVar));
  }

  deleteIngredient(ingredientIndex: number) {
    this.ingredients.removeAt(ingredientIndex);
  }

  submitRecipeForm(event: Event): void {
    event.preventDefault();
    if(!this.recipeId){
      this.addRecipe();
    }else{
      this.updateRecipe();
    }
  }

  addRecipe(): void {
    this.loading$.next(true);
    this.recipeService.addRecipe({
      name: this.name.value,
      preparationTimeInMinutes: this.preparationTime.value,
      description: this.description.value,
      ingredients: this.ingredients.value
    }).subscribe(
      data => {
        this.loading$.next(false);
        this.message$.next("new recipe was added");
        this.recipeComunicationService.fetchRecipes$.next(true);
      },
      error => {
        this.loading$.next(false);
        this.message$.next("error create");
      },
      () => {
        this.cancelRecipeForm();
      }
    );
  }

  updateRecipe(): void {
    this.loading$.next(true);
    this.recipeService.editRecipe({
      _id: this.recipeId,
      name: this.name.value,
      preparationTimeInMinutes: this.preparationTime.value,
      description: this.description.value,
      ingredients: this.ingredients.value
    }).subscribe(
      data => {
        this.loading$.next(false);
        this.message$.next("recipe was updated");
        this.recipeComunicationService.fetchRecipes$.next(true);
      },
      error => {
        this.loading$.next(false);
        this.message$.next("error update");
      },
      () => {
        this.updateFetchRecipe();
      }
    );
  }

  updateFetchRecipe(): void {
    this.fetchRecipe = {
      name: this.name.value,
      preparationTimeInMinutes: this.preparationTime.value,
      description: this.description.value,
      ingredients: this.ingredients.value
    }
  }

  cancelRecipeForm(): void {
    this.recipeForm.reset();
    let ingredientsLength = this.ingredients.length;
    for(let i = ingredientsLength-1; i >= 0; i--){
      this.deleteIngredient(i);
    }
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }
}
