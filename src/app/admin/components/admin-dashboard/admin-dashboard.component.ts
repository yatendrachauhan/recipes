import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RecipeConst } from '../../mocks/recipe.mock';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'ingredients', 'instructions', 'imageUrl', 'createdAt', 'updatedAt'];
  dataSource: MatTableDataSource<Recipe>;

  constructor() {
    this.dataSource = new MatTableDataSource<Recipe>([]);
  }

  ngOnInit() {
    // Assume you have an array of recipes called 'recipes'
    this.dataSource = new MatTableDataSource<Recipe>(RecipeConst);
  }
}
