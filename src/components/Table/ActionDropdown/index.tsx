import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { FC } from 'react';

interface IActionDropdown {
    onEdit: () => void;
    onDelete: () => void;
}

const items: MenuProps['items'] = [
  {
    label: 'Edit',
    key: 'edit',
  },
  {
    label: 'Delete',
    key: 'delete',
    danger: true,
  }
];

const ActionDropdown: FC<IActionDropdown> = ({ onEdit, onDelete }) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => e.key === 'edit' ? onEdit() : onDelete();

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
    
  return (
    <Dropdown menu={menuProps}>
      <Button>
        <DownOutlined/>
      </Button>
    </Dropdown>
  );
};

export default ActionDropdown;