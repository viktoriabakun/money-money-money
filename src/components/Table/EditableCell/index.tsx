import { DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { FC, HTMLAttributes, ReactNode, useCallback } from 'react';

import { ITableData } from '../mock-data.ts';

const selectOptions = [
  { value: 'expense', label: 'expense' },
  { value: 'income', label: 'income' },
];
interface IEditableCell extends HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text' | 'date' | 'select';
    record: ITableData;
    index: number;
    children: ReactNode;
}

export const EditableCell: FC<IEditableCell> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const generalValidationRules = useCallback( () => {
    if (dataIndex !== 'amount') {
      return [
        {
          required: true,
          message: `Please enter ${title}`,
        }
      ];
    } else {
      return [
        {
          required: true,
          pattern: new RegExp(/^[0-9]+$/),
          message: 'Please enter a valid number (using 0-9)',
        }  
      ];
    }
  }, [dataIndex, title]);

  const inputNode = () => {
    switch (inputType) {
      case 'number':
        return  <InputNumber min={0} type="number"/>;

      case 'date':
        return <DatePicker key={dataIndex} format='DD/MM/YYYY' />;

      case 'select':
        return <Select
          key={dataIndex}
          options={selectOptions}
        />;

      default:
        return <Input type="text"/>;
    }
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={generalValidationRules()}
        >
          {inputNode()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
