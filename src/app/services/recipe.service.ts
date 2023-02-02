import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecipeConst } from '../admin/mocks/recipe.mock';
import { environment } from '../../environments/environment';
import { Recipe, RecipeResponse } from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getRecipes(recipeName = ''): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl + 'recipes/' + recipeName);
  }

  getRecipesWithPages(offset: number): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(this.apiUrl + 'recipes/page/' + offset);
  }
}
