import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipeDetailsRef: MatDialogRef<any>;
  recipes: Recipe[] = [];
  loading = false;
  moreData = true;
  searchText: string = '';
  isError: boolean = false;
  errorMessage: string = '';

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadMore();
  }

  onScroll() {
    if (!this.loading) {
      // this.loadMore();
    }
  }

  loadMore() {
    this.loading = true;
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = this.recipes.concat(data);
      this.loading = false;
      this.moreData = data.length === 10;
    }, error => {
      this.loading = false;
      this.isError = true;
      this.errorMessage = 'Something went wrong, Please try again.'
    });
  }

  search() {
    this.isError = false;
    this.loading = true;
    this.recipeService.getRecipes(this.searchText).subscribe((data) => {
      this.recipes = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.isError = true;
      this.recipes = [];
      this.errorMessage = 'No recipe found. Please try to search with another recipe name.';
    });
  }

  clearSearch() {
    this.searchText = '';
    this.search();
  }

  openRecipeDetails(recipe: any) {
    const dialogRef = this.dialog.open(RecipeDetailsComponent, {
      width: '80%',
      data: recipe
    });
  }
}
