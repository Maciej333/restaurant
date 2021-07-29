import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeComponentsComunicationService {

  fetchRecipes$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  fetchRecipes(): void {
    this.fetchRecipes$.next(true);
  }
}
