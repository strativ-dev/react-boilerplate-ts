import { Row } from 'antd';
import { Children, PropsWithChildren, cloneElement, isValidElement } from 'react';

const TableHeaderTop = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
	return (
		<Row align='middle' justify='space-between'>
			{Children.map(children, (child) => {
				if (isValidElement(child)) {
					return cloneElement(child, {
						...child.props,
					});
				}

				return child;
			})}
		</Row>
	);
};

export default TableHeaderTop;
