import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipes } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipes: Recipes[] = [];
  loading = false;
  moreData = true;
  searchText: string = '';

  constructor(private recipeService: RecipeService) {}

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
    this.recipeService.getRecipes(this.recipes.length).subscribe((data) => {
      this.recipes = this.recipes.concat(data);
      this.loading = false;
      this.moreData = data.length === 10;
    });
  }

  search() {
    console.log(this.searchText);
    this.recipes = this.recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        recipe.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log(this.recipes);
  }
}
