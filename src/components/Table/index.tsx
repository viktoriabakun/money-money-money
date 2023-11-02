import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Space, Table as AntdTable } from 'antd';
import dayjs from 'dayjs';
import { Key, useCallback, useMemo, useState } from 'react';

import useLocalStorageState from '../../hooks/useLocalStorage.tsx';

import ActionDropdown from './ActionDropdown';
import { EditableCell } from './EditableCell';
import { currency, ITableData, mockTableData } from './mock-data.ts';
import SummaryFooter from './SummaryFooter';

const Table = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useLocalStorageState('tableData', mockTableData);
  const [editingKey, setEditingKey] = useState('');

  const cancelRowEditing = () =>
    setEditingKey('');

  const isEditing = useCallback((record: ITableData) => record.key === editingKey, [editingKey]);

  const handleEdit = useCallback((record: Partial<ITableData> & { key: Key })=> {
    form.setFieldsValue({ date: new Date(), amount: 0, type: 'income', note: '', ...record });
    setEditingKey(record.key);
  }, [form]);

  const handleSaveEdit = useCallback( async (key: Key) => {
    try {
      const row = (await form.validateFields()) as ITableData;

      const newData = [...tableData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setTableData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setTableData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }, [form, setTableData, tableData]);
  
  const handleDelete = useCallback( (key: string)=> {
    console.log('delete', key);
  }, []);

  const columns = useMemo( () =>  [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      editable: true,
      render: (date: Date) => dayjs(date).format('DD/MM/YYYY'),
      sorter: (a: ITableData, b: ITableData) => new Date(a.date.valueOf()).getTime() - new Date(b.date.valueOf()).getTime()
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
      render: (_: unknown, row: ITableData) => <div>{`${row.type === 'expense' ? '-' : ''}${row.amount}${currency}`}</div>,
      sorter: (a: ITableData, b: ITableData) => Number(a.amount - b.amount)
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      editable: true,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: ITableData) => {
        const editing = isEditing(record);
        return editing ? (
          <Space>
            <Button onClick={() => handleSaveEdit(record.key)} type="primary" shape="circle" icon={<CheckOutlined />} />
            <Button onClick={cancelRowEditing} type="primary" danger shape="circle" icon={<CloseOutlined />} />
          </Space>
        ) : (
          <ActionDropdown onEdit={() => handleEdit(record)} onDelete={() => handleDelete(record.key)}/>
        );
      }
    },
  ], [handleDelete, handleEdit, handleSaveEdit, isEditing]);

  const mergedColumns = useMemo( () => columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    const getInputType = () => {
      switch (col.dataIndex) {
        case 'amount':
          return 'number';
        case 'date':
          return 'date';
        case 'type':
          return 'select';
        default:
          return 'text';
      }
    };

    return {
      ...col,
      onCell: (record: ITableData) => ({
        record,
        inputType: getInputType(),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  }),[columns, isEditing]);

  const totalAmount = useMemo(() => tableData.reduce((acc, { amount, type }) => {
    if (type === 'expense') {
      return acc - amount;
    }
    return acc + amount;
  }, 0),
  [tableData]);

  const summary = useCallback(() => <SummaryFooter totalAmount={totalAmount}/>, [totalAmount]);

  return <Form form={form} component={false}>
    <AntdTable
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      bordered
      rowKey="key"
      columns={mergedColumns}
      dataSource={tableData}
      summary={summary}
      pagination={{ position: ['none', 'none'] }}
    />
  </Form>
  ;
};

export default Table;