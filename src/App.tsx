import './App.css';
import { Flex } from 'antd';

import Table from './components/Table';

const App = () => (
  <Flex align="flex-start" vertical gap={20}>
    <Table />
  </Flex>
);

export default App;
