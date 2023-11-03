import { Button, Flex } from 'antd';
import { useCallback } from 'react';

const ErrorPage = () => {
  const onReload = useCallback( () => window.location.reload(), []);
    
  return (
    <Flex vertical align="center">
      <h1>Oops, something went wrong :(</h1>
      <Button
        type="primary"
        onClick={onReload}
      >
        Reload page
      </Button>
    </Flex>
  );
};

export default ErrorPage;