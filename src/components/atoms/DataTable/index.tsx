import { Children, PropsWithChildren, cloneElement, isValidElement } from 'react';

import DataTableLink from './DataTableLink';
import DataTableTitle from './DataTableTitle';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableHeaderTop from './TableHeaderTop';
import TableMenuOptions from './TableMenuOptions';
import { TableContainer } from './styles';

const DataTable = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
	return (
		<TableContainer>
			{Children.map(children, (child) => {
				if (isValidElement(child)) {
					return cloneElement(child, {
						...child.props,
					});
				}

				return child;
			})}
		</TableContainer>
	);
};

DataTable.Body = TableBody;
DataTable.Header = TableHeader;
DataTable.HeaderTop = TableHeaderTop;
DataTable.MenuOptions = TableMenuOptions;
DataTable.Title = DataTableTitle;
DataTable.Link = DataTableLink;

export default DataTable;
