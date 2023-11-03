import dayjs from 'dayjs';
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
    date: dayjs('2023-09-15'),
    amount: 500,
    type: 'income',
    note: 'Salary',
  },
  {
    key: '2',
    date: dayjs('2023-09-20'),
    amount: 250,
    type: 'expense',
    note: 'Rent',
  },
  {
    key: '3',
    date: dayjs('2023-10-01'),
    amount: 10,
    type: 'expense',
    note: '42kg of potatoes',
  },
  {
    key: '4',
    date: dayjs('2023-10-02'),
    amount: 5,
    type: 'expense',
    note: 'Grater for potatoes',
  },
  {
    key: '5',
    date: dayjs('2023-10-03'),
    amount: 1,
    type: 'expense',
    note: 'Sour cream for draniki',
  },
];

export const currency = '$';