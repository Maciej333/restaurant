import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './components/recipe-list/recipe-list-item/recipe-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RecipeFormComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeListItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    RecipeFormComponent,
    RecipeComponent,
    RecipeListComponent
  ]
})
export class RecipeModule { }
