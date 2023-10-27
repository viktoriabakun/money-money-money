import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message } from 'antd';
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
  },];

const ActionDropdown: FC<IActionDropdown> = ({ onEdit, onDelete }) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on' + e.key);
    e.key === 'edit' ? onEdit() : onDelete();
  };

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