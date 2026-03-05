import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { CategoriesComponent } from './components/categories/categories.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'add-transaction', component: AddTransactionComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'categories', component: CategoriesComponent}
];
