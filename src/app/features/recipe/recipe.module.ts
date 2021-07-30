import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './components/recipe-list/recipe-list-item/recipe-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RecipeDeleteDialogComponent } from './components/recipe-list/recipe-delete-dialog/recipe-delete-dialog.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    RecipeFormComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeListItemComponent,
    RecipeDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    CoreModule
  ],
  exports: [
    RecipeFormComponent,
    RecipeComponent,
    RecipeListComponent
  ],
  entryComponents: [
    RecipeDeleteDialogComponent
  ]
})
export class RecipeModule { }
