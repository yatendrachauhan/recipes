import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecipeConst } from '../admin/mocks/recipe.mock';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes(offset: number): Observable<any> {
    // return this.http.get('https://your-api.com/recipes', {
    //   params: { offset },
    // });
    return of(RecipeConst);
  }
}
