export interface ITableData {
    id: string;
    date: Date | string;
    amount: number;
    type: 'income' | 'expense';
    note: string;
}

export const mockTableData: ITableData[] = [
  {
    id: '1',
    date: new Date(2023, 9, 5),
    amount: 3000,
    type: 'income',
    note: 'Salary',
  },
  {
    id: '2',
    date: new Date(2023, 9, 14),
    amount: 100,
    type: 'expense',
    note: 'Gift',
  },
  {
    id: '3',
    date: new Date(2023, 9, 10),
    amount: 1000,
    type: 'expense',
    note: 'Rent',
  },
  {
    id: '4',
    date: new Date(2023, 9, 21),
    amount: 200,
    type: 'expense',
    note: 'Forest & mountain camping weekend',
  }
];

export const currency = '$';