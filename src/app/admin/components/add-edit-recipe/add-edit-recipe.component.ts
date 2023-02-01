import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  recipe: Recipe | null;
  isEdit: boolean = false;
  selectable: boolean = false;
  removable: boolean = false;
  base64ImageValue = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    private recipeService: RecipeService,
    private snackBar: MatSnackBar) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state && currentNavigation?.extras.state['recipe']) {
      this.isEdit = true;
      this.recipe = currentNavigation?.extras.state['recipe'];
      this.base64ImageValue = this.recipe?.encodedImage || '';
    } else {
      this.recipe = null;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.recipeForm = this.fb.group({
      title: [this.recipe ? this.recipe.title : '', Validators.required],
      description: [this.recipe ? this.recipe.description : '', Validators.required],
      ingredients: [this.recipe ? this.recipe.ingredients : '', Validators.required],
      instructions: [this.recipe ? this.recipe.instructions : '', Validators.required],
      encodedImage: [this.recipe ? this.recipe.encodedImage : ''],
      cookingTime: [this.recipe ? (this.recipe.cookingTime.match(/\d+/g) ? this.recipe.cookingTime.match(/\d+/g)![0] : '') : '', Validators.required],
      servingSize: [this.recipe ? (this.recipe.servingSize.match(/\d+/g) ? this.recipe.servingSize.match(/\d+/g)![0] : '') : '', Validators.required]
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.recipeForm.patchValue({
        encodedImage: reader.result as string
      });
      this.base64ImageValue = reader.result as string;
    };
  }

  submitForm() {
    if (this.recipeForm.valid) {
      if (this.isEdit) {
        let recipeParams = {
          ...this.recipeForm.value,
          id: this.recipe?.id
        }
        this.recipeService.updateRecipe(recipeParams).subscribe({
          next: this.handleSuccess.bind(this),
          error: this.handleError.bind(this)
        })
      } else {
        this.recipeService.addRecipe(this.recipeForm.value).subscribe({
          next: this.handleSuccess.bind(this),
          error: this.handleError.bind(this)
        })
      }
    }
  }

  handleSuccess() {
    if (this) {
      this.snackBar.open(`Recipe ${this.isEdit ? 'updated' : 'added'} successfully`, 'Close', {
        duration: 5000,
        panelClass: ['success']
      });
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  handleError(err: HttpErrorResponse) {
    let message = '';
    if (err?.error?.message) {
      message = err?.error?.message;
    } else if (err?.error?.errorMessage) {
      message = err?.error?.errorMessage;
    } else {
      message = err.message
    }

    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error']
    });
  }

}
