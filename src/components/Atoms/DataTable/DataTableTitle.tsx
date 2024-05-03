import { Col } from 'antd';
import { PropsWithChildren } from 'react';

import { TableTitle } from './styles';

const DataTableTitle = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
	return (
		<Col>
			<TableTitle>{children}</TableTitle>
		</Col>
	);
};

export default DataTableTitle;
