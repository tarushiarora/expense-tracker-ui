import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/transaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})

export class AddTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  categories: any[] = [];
  filteredCategories: any[] = [];
  saveSuccess = false;

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.transactionForm = new FormGroup({
      type: new FormControl('EXPENSE', Validators.required),
      categoryId: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', Validators.required),
      date: new FormControl(new Date().toISOString().substring(0,10))
    });
  }

  ngOnInit(){
    // load all categories from SpringBoot API
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.filterCategories();
      },
      error: (err) => console.error('Error fetching categories:', err),
    });

    // for changes in the 'type' dropdown (Income vs Expense)
    this.transactionForm.get('type')?.valueChanges.subscribe(() => {
      this.filterCategories();
    });
  }

  filterCategories(){
    const selectedType = this.transactionForm.get('type')?.value;
    this.filteredCategories = this.categories.filter(c => c.type === selectedType);
    this.transactionForm.get('categoryId')?.setValue('');
  }

  onSubmit(){
    if(this.transactionForm.valid){
      const formData = this.transactionForm.value;
      const payload = {
        description: formData.description,
        amount: formData.amount,
        date: formData.date,
        category: {
          id: formData.categoryId, // This maps the ID from the dropdown to a Category object
        },
      };

      console.log('Sending Payload to Spring Boot:', payload);

      this.transactionService.saveTransaction(payload).subscribe({
        next: (response) => {
          this.saveSuccess = true;

          // wait 2 sec, so user can see message then redirect
          setTimeout(() => {
            // Navigate back to the Dashboard to see the new list
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (err) => {
          console.error('Save failed:', err);
          alert('Could not save transaction.');
        },
      });
    }
  }
}
