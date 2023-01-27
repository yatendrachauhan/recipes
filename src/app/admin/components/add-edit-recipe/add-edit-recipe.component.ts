import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  recipe: Recipe = new Recipe();
  isEdit: boolean = false;
  selectable: boolean = false;
  removable: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.isEdit = !!id;
      if (this.isEdit) {
        this.initForm();
        // this.recipeService.getRecipe(id).subscribe(recipe => {
        //   this.recipe = recipe;
        //   this.initForm();
        // });
      } else {
        this.initForm();
      }
    });
  }

  initForm() {
    this.recipeForm = this.fb.group({
      name: [this.recipe ? this.recipe.name : '', Validators.required],
      description: [this.recipe ? this.recipe.description : '', Validators.required],
      ingredients: [this.recipe ? this.recipe.ingredients : '', Validators.required],
      instructions: [this.recipe ? this.recipe.instructions : '', Validators.required],
      imageUrl: [this.recipe ? this.recipe.imageUrl : '']
      });
  }

  submitForm() {}

  addIngredient(ev: any) {
    // this.ingredients.push({});
  }

  removeIngredient(index: number) {
    // this.ingredients.splice(index, 1);
  }

  saveRecipe() {
    // code to save the recipe
  }

}
