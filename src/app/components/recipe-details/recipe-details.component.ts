import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from 'src/app/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = {} as Recipe;
  constructor(private dialogRef: MatDialogRef<RecipeDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.title);
    // this.recipe = this.dialogRef.componentInstance.data;
  }

  closeRecipeDetails() {
    this.dialogRef.close();
  }

}
