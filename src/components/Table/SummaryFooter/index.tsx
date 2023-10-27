import { Table as AntdTable } from 'antd';
import { memo, NamedExoticComponent } from 'react';

import { currency } from '../mock-data.ts';

interface ISummaryFooter {
    totalAmount: number;
}

const SummaryFooter: NamedExoticComponent<ISummaryFooter> =  memo(({ totalAmount }) => (
  <AntdTable.Summary fixed="bottom">
    <AntdTable.Summary.Row>
      <AntdTable.Summary.Cell index={0} colSpan={4}>
        <div>Total</div>
      </AntdTable.Summary.Cell>
      <AntdTable.Summary.Cell index={1}>{`${totalAmount}${currency}`}</AntdTable.Summary.Cell>
    </AntdTable.Summary.Row>
  </AntdTable.Summary>
));

SummaryFooter.displayName = 'SummaryFooter';

export default SummaryFooter;