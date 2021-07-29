import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Recipe } from 'src/app/core/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {

  private static crudcrudApiKey: string  = '17fa0b8fb7c646e98c313f244f0a21ba';

  constructor(private http: HttpClient) { }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`http://localhost:4200/api/${RecipeDataService.crudcrudApiKey}/recipe`)
      .pipe(
        retry(2),
        catchError(error => {
          throw 'error fetching recipes : ' + error;
        })
      );
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`http://localhost:4200/api/${RecipeDataService.crudcrudApiKey}/recipe/${id}`)
      .pipe(
        retry(2)
      );
  }

  public addRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(`http://localhost:4200/api/${RecipeDataService.crudcrudApiKey}/recipe`, recipe)
      .pipe(
        retry(2)
      );
  }

  public editRecipe(recipe: Recipe): Observable<any> {
    return this.http.put<any>(`http://localhost:4200/api/${RecipeDataService.crudcrudApiKey}/recipe/${recipe._id}`,{...recipe, _id: undefined})
      .pipe(
        retry(2)
      );
  }

  public deleteRecipe(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:4200/api/${RecipeDataService.crudcrudApiKey}/recipe/${id}`)
      .pipe(
        retry(2)
      );
  }

}
