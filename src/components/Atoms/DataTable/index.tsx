import { Children, PropsWithChildren, cloneElement, isValidElement } from 'react';

import DataTableLink from '~/components/Atoms/DataTable/DataTableLink';
import DataTableTitle from '~/components/Atoms/DataTable/DataTableTitle';
import TableBody from '~/components/Atoms/DataTable/TableBody';
import TableHeader from '~/components/Atoms/DataTable/TableHeader';
import TableHeaderTop from '~/components/Atoms/DataTable/TableHeaderTop';
import TableMenuOptions from '~/components/Atoms/DataTable/TableMenuOptions';
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
