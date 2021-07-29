import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/components/not-found/not-found.component';
import { RecipeFormComponent } from './features/recipe/components/recipe-form/recipe-form.component';
import { RecipeComponent } from './features/recipe/components/recipe/recipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  { path: 'recipe', component: RecipeComponent, pathMatch: 'full' },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'create/recipe', component: RecipeFormComponent, pathMatch: 'full' },
  { path: 'recipe/edit/:id', component: RecipeFormComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
