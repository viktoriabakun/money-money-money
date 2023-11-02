import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

export interface ITableData {
    key: string;
    date: Dayjs;
    amount: number;
    type: 'income' | 'expense';
    note: string;
}

export const mockTableData: ITableData[] = [
  {
    key: '1',
    date: dayjs('2023-09-25'),
    amount: 3000,
    type: 'income',
    note: 'Salary',
  },
  {
    key: '2',
    date: dayjs('2023-09-20'),
    amount: 100,
    type: 'expense',
    note: 'Gift',
  },
  {
    key: '3',
    date: dayjs('2023-10-25'),
    amount: 1000,
    type: 'expense',
    note: 'Rent',
  },
  {
    key: '4',
    date: dayjs('2023-09-26'),
    amount: 200,
    type: 'expense',
    note: 'Forest & mountain camping weekend',
  }
];

export const currency = '$';