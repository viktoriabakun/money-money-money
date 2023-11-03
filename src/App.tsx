import './App.css';
import { Flex } from 'antd';

import Table from './components/Table';
import { ErrorBoundary } from './ErrorBoundary.tsx';

const App = () => (
  <ErrorBoundary>
    <Flex align="flex-start" vertical gap={20}>
      <Table />
    </Flex>
  </ErrorBoundary>
);

export default App;
