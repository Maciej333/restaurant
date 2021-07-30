import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipeFormComponent } from 'src/app/features/recipe/components/recipe-form/recipe-form.component';
import { RecipeDataService } from 'src/app/features/recipe/services/recipe-data.service';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class LeaveRecipeFormGuard implements CanDeactivate<RecipeFormComponent> {

  constructor(private recipeService: RecipeDataService){

  }

  canDeactivate(component: RecipeFormComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const recipeId: string = component.recipeId;
    const fetchRecipe: Recipe = component.fetchRecipe;
    const nameField: string = component.recipeForm.controls['name'].value;
    const preparationTimeField: number = component.recipeForm.controls['preparationTime'].value;
    const description: string = component.recipeForm.controls['description'].value;
    const ingredients: Ingredient[] = component.recipeForm.controls['ingredients'].value;

    if(!recipeId){
      if(!(nameField  || preparationTimeField  || description  || ingredients.length)){
        return true;
      }else {
        const userChoose = confirm("In form are populated unsaved changes, do You want to leave the view?");
        if(userChoose){
          return true;
        }else{
          return false;
        }
      }
    }else{
      let canDeactivate = (nameField === fetchRecipe.name) && (preparationTimeField === fetchRecipe.preparationTimeInMinutes) && (description === fetchRecipe.description);
      if(fetchRecipe.ingredients.length !== ingredients.length){
        canDeactivate = canDeactivate && false;
      }else {
        for(let i = 0; i<ingredients.length; i++){
          if((ingredients[i].name === fetchRecipe.ingredients[i].name) && (ingredients[i].quantity === fetchRecipe.ingredients[i].quantity)){
            canDeactivate = canDeactivate && true;
          }else{
            canDeactivate = canDeactivate && false;
          }
        }
      }
      if(canDeactivate){
        return true;
      }else {
        const userChoose = confirm("In form are populated unsaved changes, do You want to leave the view?");
        if(userChoose){
          return true;
        }else{
          return false;
        }
      }
    }
  }

}
