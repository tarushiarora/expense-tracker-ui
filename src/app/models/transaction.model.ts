//IN Java transaction class -> ao here also angular needs to know
// what my transaction looks like

export interface Category {
  id: number;
  name: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string;
  category: Category;
}