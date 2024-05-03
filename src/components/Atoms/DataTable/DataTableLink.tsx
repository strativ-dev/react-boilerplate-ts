import { PlusOutlined } from '@ant-design/icons';
import { Button, Col } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type MergedHTMLAttributes = Omit<
	React.HTMLAttributes<HTMLElement> &
		React.ButtonHTMLAttributes<HTMLElement> &
		React.AnchorHTMLAttributes<HTMLElement>,
	'type'
>;

interface DataTableLinkProps extends BaseButtonProps, MergedHTMLAttributes {
	showIcon?: boolean;
	path?: string;
	buttonType?: 'link' | 'button';
}

const CreateButton = styled(Button)`
	padding: ${(props) => (props.size === 'middle' || !props.size) && '0.5rem 1rem'};
	height: auto;
	font-weight: 400;
`;

const DataTableLink = ({
	type = 'primary',
	size,
	path,
	children,
	buttonType = 'button',
	showIcon = true,
	icon = null,
	...resProps
}: PropsWithChildren<DataTableLinkProps>) => {
	return (
		<Col>
			{buttonType === 'link' ? (
				<Link to={path!}>
					<CreateButton type={type} size={size} icon={showIcon ? icon ?? <PlusOutlined /> : null}>
						{children}
					</CreateButton>
				</Link>
			) : (
				<CreateButton
					{...resProps}
					type={type}
					size={size}
					icon={showIcon ? icon ?? <PlusOutlined /> : null}
				>
					{children}
				</CreateButton>
			)}
		</Col>
	);
};

export default DataTableLink;
