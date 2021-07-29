import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';



@NgModule({
  declarations: [
    RecipeFormComponent,
    RecipeComponent,
    RecipeListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecipeFormComponent,
    RecipeComponent,
    RecipeListComponent
  ]
})
export class RecipeModule { }
