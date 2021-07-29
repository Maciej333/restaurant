import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/core/models/ingredient';
import { RecipeDataService } from '../../services/recipe-data.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent implements OnInit {

  recipeForm: FormGroup = new FormGroup({});
  recipeId: string = '';
  constructor(private formBuilder: FormBuilder,private recipeService: RecipeDataService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if(params?.id){
        this.fetchRecipeData(params?.id);
        this.recipeId = params?.id;
      } else {
        this.createForm();
        this.recipeId = '';
      }
    })
  }

  fetchRecipeData(id: string): void {
    this.recipeService.getRecipe(id).subscribe(
      recipe => {
        this.createForm(recipe.name, recipe.preparationTimeInMinutes, recipe.description, recipe.ingredients);
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
    this.recipeService.addRecipe({
      name: this.name.value,
      preparationTimeInMinutes: this.preparationTime.value,
      description: this.description.value,
      ingredients: this.ingredients.value
    }).subscribe(data => {

    });
  }

  updateRecipe(): void {
    this.recipeService.editRecipe({
      _id: this.recipeId,
      name: this.name.value,
      preparationTimeInMinutes: this.preparationTime.value,
      description: this.description.value,
      ingredients: this.ingredients.value
    }).subscribe(data => {
      
    });
  }

  cancelRecipeForm(): void {
    this.recipeForm.reset();
  }
}
