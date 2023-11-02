import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Space, Table as AntdTable } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
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
  const [addingKey, setAddingKey] = useState('');

  const isEditing = useCallback((record: ITableData) => record.key === editingKey, [editingKey]);
  const isAdding = useCallback((record: ITableData) => record.key === addingKey, [addingKey]);
  
  const cancelRowEditing = useCallback( () => setEditingKey(''), []);
  const cancelRowAdding = useCallback( () => {
    const newData = [...tableData].filter((item) => item.key !== addingKey);
    setTableData(newData);
    setAddingKey('');
  }, [addingKey, setTableData, tableData]);

  const onEdit = useCallback((record: Partial<ITableData> & { key: Key })=> {
    form.setFieldsValue({ date: dayjs(), amount: 0, type: 'income', note: '', ...record });
    setEditingKey(record.key);
  }, [form]);

  const onAddNew = useCallback(() => {
    const newKey = Date.now().toString();
    form.setFieldsValue({ date: dayjs(), amount: 0, type: 'income', note: '' });
    setTableData([...tableData, { key: newKey, date: dayjs(), amount: 0, type: 'income', note: '' }]);
    setAddingKey(newKey);
    setEditingKey(newKey);
  }, [form, setTableData, tableData]);

  // This function is used for both editing and adding new row
  // Since adding a new row is just editing of an empty one, we can reuse the same function
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
      } else {
        newData.push(row);
        setTableData(newData);
      }

      setEditingKey('');
      setAddingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }, [form, setTableData, tableData]);
  
  const handleDelete = useCallback( (key: string)=> {
    const newData = [...tableData];
    setTableData(newData.filter((item) => item.key !== key));
  }, [setTableData, tableData]);

  const columns = useMemo( () =>  [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      editable: true,
      defaultSortOrder: 'descend' as SortOrder,
      render: (date: Date) => dayjs(date).format('DD/MM/YYYY'),
      sorter: (a: ITableData, b: ITableData) => a.date.valueOf() - b.date.valueOf()
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
        const adding = isAdding(record);
        const cancelRowAction = adding ? cancelRowAdding : cancelRowEditing;
        return editing ? (
          <Space>
            <Button onClick={() => handleSaveEdit(record.key)} type="primary" shape="circle" icon={<CheckOutlined />} />
            <Button onClick={cancelRowAction} type="primary" danger shape="circle" icon={<CloseOutlined />} />
          </Space>
        ) : (
          <ActionDropdown onEdit={() => onEdit(record)} onDelete={() => handleDelete(record.key)}/>
        );
      }
    },
  ], [isEditing, isAdding, cancelRowAdding, cancelRowEditing, handleSaveEdit, onEdit, handleDelete]);

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
        defaultSortOrder: col.dataIndex === 'date' ? 'descend' as SortOrder : undefined,
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
    <Button onClick={onAddNew} disabled={Boolean(addingKey)} type="primary">Add new</Button>

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