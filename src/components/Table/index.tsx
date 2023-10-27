import { Table as AntdTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useCallback, useMemo } from 'react';

import useLocalStorageState from '../../hooks/useLocalStorage.tsx';

import ActionDropdown from './ActionDropdown';
import { currency, ITableData, mockTableData } from './mock-data.ts';
import SummaryFooter from './SummaryFooter';
import { formatDate } from './table.helpers.ts';

const Table = () => {
  const [tableData] = useLocalStorageState('tableData', mockTableData);
  
  const handleEdit = useCallback((id: string)=> {
    console.log('edit', id);
  }, []);
  
  const handleDelete = useCallback( (id: string)=> {
    console.log('delete', id);
  }, []);

  const columns: ColumnsType<ITableData> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date', 
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, row: ITableData) => <div>{`${row.type === 'expense' ? '-' : ''}${row.amount}${currency}`}</div>,
      sorter: (a, b) => Number(a.amount - b.amount)
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { id }: ITableData) => (
        <ActionDropdown onEdit={() => handleEdit(id)} onDelete={() => handleDelete(id)} />
      )
    },
  ];
  
  const totalAmount = useMemo(() => tableData.reduce((acc, { amount, type }) => {
    if (type === 'expense') {
      return acc - amount;
    }
    return acc + amount;
  }, 0),
  [tableData]);

  const summary = useCallback(() => <SummaryFooter totalAmount={totalAmount}/>, [totalAmount]);

  return <AntdTable 
    rowKey="id"
    columns={columns}
    dataSource={tableData}
    summary={summary}
    pagination={{ position: ['none', 'none'] }} />;
};

export default Table;