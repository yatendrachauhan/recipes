import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecipeConst } from '../admin/mocks/recipe.mock';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getRecipes(recipeName = ''): Observable<any> {
    return this.http.get(this.apiUrl + 'recipes/' + recipeName);
  }
}
