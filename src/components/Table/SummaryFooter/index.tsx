import { Table as AntdTable, Typography } from 'antd';
import { memo, NamedExoticComponent } from 'react';

import { currency } from '../mock-data.ts';

const { Text } = Typography;

interface ISummaryFooter {
    totalAmount: number;
}

const SummaryFooter: NamedExoticComponent<ISummaryFooter> =  memo(({ totalAmount }) => (
  <AntdTable.Summary fixed="bottom">
    <AntdTable.Summary.Row>

      <AntdTable.Summary.Cell index={0} colSpan={4}>
        <Text strong>Total</Text>
      </AntdTable.Summary.Cell>

      <AntdTable.Summary.Cell index={1}>
        <Text strong>
          {`${totalAmount}${currency}`}
        </Text>
      </AntdTable.Summary.Cell>
    </AntdTable.Summary.Row>
  </AntdTable.Summary>
));

SummaryFooter.displayName = 'SummaryFooter';

export default SummaryFooter;