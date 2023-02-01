import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

//   it('should return a list of recipes', () => {
//     const spy = spyOn(service, 'getRecipes').and.returnValue([]);
//     const result = service.getRecipes();
//     expect(result).toEqual([]);
//     expect(spy).toHaveBeenCalled();
//   });

//   it('should add a recipe to the list of recipes', () => {
//     const recipe = { name: 'Recipe 1', ingredients: ['Ingredient 1', 'Ingredient 2'] };
//     const spy = spyOn(service, 'addRecipe').and.callThrough();
//     service.addRecipe(recipe);
//     expect(service.recipes).toContain(recipe);
//     expect(spy).toHaveBeenCalledWith(recipe);
//   });

//   it('should update a recipe in the list of recipes', () => {
//     const originalRecipe = { name: 'Recipe 1', ingredients: ['Ingredient 1', 'Ingredient 2'] };
//     const updatedRecipe = { name: 'Recipe 1', ingredients: ['Ingredient 2', 'Ingredient 3'] };
//     service.recipes = [originalRecipe];
//     const spy = spyOn(service, 'updateRecipe').and.callThrough();
//     service.updateRecipe(originalRecipe, updatedRecipe);
//     expect(service.recipes).toContain(updatedRecipe);
//     expect(spy).toHaveBeenCalledWith(originalRecipe, updatedRecipe);
//   });

//   it('should delete a recipe from the list of recipes', () => {
//     const recipe = { name: 'Recipe 1', ingredients: ['Ingredient 1', 'Ingredient 2'] };
//     service.recipes = [recipe];
//     const spy = spyOn(service, 'deleteRecipe').and.callThrough();
//     service.deleteRecipe(recipe);
//     expect(service.recipes).not.toContain(recipe);
//     expect(spy).toHaveBeenCalledWith(recipe);
//   });
});