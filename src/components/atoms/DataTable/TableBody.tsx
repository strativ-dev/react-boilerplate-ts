/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableProps } from 'antd';

import { AntTableContainer } from './styles';

interface AnyObject {
	[key: string]: any;
}

interface TableBodyProps<T> extends TableProps<T> {
	count?: number;
	noRowHover?: boolean;
}

const TableBody = <T extends AnyObject>({
	count = 0,
	noRowHover = false,
	...restProps
}: TableBodyProps<T>) => {
	return (
		<AntTableContainer count={count} noRowHover={noRowHover}>
			<Table {...restProps} />
		</AntTableContainer>
	);
};

export default TableBody;
