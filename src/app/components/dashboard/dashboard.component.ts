import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];

  // defining variables for summary
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpense: number = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err) => console.error('Could not load transactions', err),
    });
  }

  // math calculation
  calculateTotals(){
    this.totalIncome = this.transactions
    .filter(t => t.category.type === 'INCOME')
    .reduce((sum,t) => sum + t.amount,0);
    // sum: accumulator, t: currTransaction, 0: startingvalue

    this.totalExpense = this.transactions
    .filter(t => t.category.type === 'EXPENSE')
    .reduce((sum,t) => sum + t.amount,0);

    this.totalBalance = this.totalIncome - this.totalExpense;
  }

  confirmDelete(id: number | undefined) {
    if (!id) return;

    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          // Topic: Filtering arrays to update UI
          // We filter out the deleted ID to compute new totals
          this.transactions = this.transactions.filter((t) => t.id !== id);
    
          this.calculateTotals();
          console.log('Transaction deleted successfully');
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert(
            'Could not delete. Please check if server is running.',
          );
        },
      });
    }
  }
}
