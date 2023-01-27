import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecipeConst } from '../../mocks/recipe.mock';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'ingredients', 'instructions', 'imageUrl', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Recipe>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private paginatorIntl: MatPaginatorIntl, private changeDetectorRef: ChangeDetectorRef) {
    this.paginator = new MatPaginator(this.paginatorIntl, this.changeDetectorRef);
    this.dataSource = new MatTableDataSource<Recipe>([]);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    // Assume you have an array of recipes called 'recipes'
    this.dataSource = new MatTableDataSource<Recipe>(RecipeConst);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addRecipe() {

  }

  editRecipe(recipe: Recipe) {
    // code for editing the recipe
    // you can use a form to gather the recipe details
    // and then use the form data to update the recipe
  }

  deleteRecipe(recipe: Recipe) {
    // code for deleting the recipe
    // you can use the id of the recipe to delete it from the dataSource
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'id': return this.compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
