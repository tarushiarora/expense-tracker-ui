//IN Java transaction class -> ao here also angular needs to know
// what my transaction looks like

export interface Transaction{
    id?:number;
    description: string,
    amount: number,
    date: string;
    type: 'INCOME' | 'EXPENSE';
}