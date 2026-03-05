import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})

export class CategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('EXPENSE', Validators.required),
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error loading categories ', err),
    });
  }

  onAddCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).subscribe({
        next: () => {
          this.loadCategories(); // Refresh the list
          this.categoryForm.reset({ type: 'EXPENSE' }); // Clear the form
        },
      });
    }
  }

  onDelete(id: number) {
    if (confirm('Delete this category? Transactions using it might be affected.')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories()
      });
    }
  }
}
