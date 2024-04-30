import { PropsWithChildren } from 'react';

import { TableTopSection } from './styles';

const TableHeader = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
	return <TableTopSection>{children}</TableTopSection>;
};

export default TableHeader;
