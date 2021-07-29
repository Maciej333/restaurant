import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListItemComponent {

  @Input() recipe: Recipe = {
    name: '',
    preparationTimeInMinutes: 0,
    description: '',
    ingredients: []
  };

  constructor(private router: Router) { }

  showRecipe(): void {
    this.router.navigateByUrl(`/recipe/${this.recipe?._id}`)
  }

  editRecipe(event: Event): void {
    event.stopPropagation();
    this.router.navigateByUrl(`/recipe/edit/${this.recipe?._id}`)
  }

  deleteRecipe(event: Event): void {
    event.stopPropagation();
    this.router.navigateByUrl(`/recipe`);
  }

}
