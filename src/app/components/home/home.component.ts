import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipes } from '../../interfaces/recipe.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('recipeDetails', { static: false }) recipeDetails: TemplateRef<any>;
  recipeDetailsRef: MatDialogRef<any>;
  recipes: Recipes[] = [];
  loading = false;
  moreData = true;
  searchText: string = '';

  constructor(
    private recipeService: RecipeService,
    private router: Router,
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
    });
  }

  search() {
    // console.log(this.searchText);
    // this.recipes = this.recipes.filter(
    //   (recipe) =>
    //     recipe?.title?.toLowerCase().includes(this.searchText.toLowerCase()) ||
    //     recipe?.description
    //       ?.toLowerCase()
    //       .includes(this.searchText.toLowerCase())
    // );
    // console.log(this.recipes);

    this.loading = true;
    this.recipeService.getRecipes(this.searchText).subscribe((data) => {
      this.recipes = data;
      this.loading = false;
    });
  }

  openRecipeDetails(recipe: any) {
    console.log(recipe)
    this.recipeDetailsRef = this.dialog.open(this.recipeDetails, {
      data: { recipe },
    });
  }

  closeRecipeDetails() {
    this.recipeDetailsRef.close();
  }
}
