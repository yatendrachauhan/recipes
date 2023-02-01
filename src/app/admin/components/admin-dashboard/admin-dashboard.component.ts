import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'description', 'ingredients', 'instructions', 'imageUrl', 'actions'];
  dataSource: MatTableDataSource<Recipe>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private destroy$ = new Subject<void>();

  constructor(
    private paginatorIntl: MatPaginatorIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private recipeService: RecipeService,
    private dialog: MatDialog) {
    this.paginator = new MatPaginator(this.paginatorIntl, this.changeDetectorRef);
    this.dataSource = new MatTableDataSource<Recipe>([]);
  }

  ngOnInit() {
    this.fetchRecipes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchRecipes() {
    this.recipeService.getRecipes().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource<Recipe>(response);
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
        }
      });
  }

  deleteRecipe(recipeId: string) {
    this.recipeService.deleteRecipe(recipeId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.fetchRecipes();
      },
      error: (err) => {
        this.fetchRecipes();
      }
    });
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
        case 'name': return this.compare(a.title, b.title, isAsc);
        case 'id': return this.compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openConfirmDialog(recipeId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this recipe?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the delete recipe function and pass the recipe id
        this.deleteRecipe(recipeId);
      }
    });
  }
}
