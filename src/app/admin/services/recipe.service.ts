import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    apiUrl = environment.apiUrl;
    private recipesUrl = this.apiUrl + 'recipes';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.recipesUrl);
    }

    getRecipe(id: number): Observable<Recipe> {
        const url = `${this.recipesUrl}/Spaghetti Bolognese`;
        return this.http.get<Recipe>(url);
    }

    addRecipe(recipe: Partial<Recipe>): Observable<Recipe> {
        const headers = new HttpHeaders({ 'Authorization': `Basic ${this.authService.authCode}` });
        return this.http.post<Recipe>(this.recipesUrl, recipe, { headers });
    }

    updateRecipe(recipe: Recipe): Observable<Recipe> {
        const headers = new HttpHeaders({ 'Authorization': `Basic ${this.authService.authCode}` });
        const url = `${this.recipesUrl}/${recipe.id}`;
        return this.http.put<Recipe>(url, recipe, { headers });
    }

    deleteRecipe(recipeId: string): Observable<{message: string}> {
        const headers = new HttpHeaders({ 'Authorization': `Basic ${this.authService.authCode}` });
        const url = `${this.recipesUrl}/${recipeId}`;
        return this.http.delete<{message: string}>(url, { headers });
    }
}