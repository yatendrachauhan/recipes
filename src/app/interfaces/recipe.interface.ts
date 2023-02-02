export class Recipe {
  id: string = '';
  title: string = '';
  description: string = '';
  ingredients: string = '';
  instructions: string = '';
  cookingTime: string = '';
  servingSize: string = '';
  encodedImage: string = '';
}


export class RecipeResponse {
  pageSize: number;
  recipes: Recipe[];
  totalPages: number;
  totalRecipes: number;
}