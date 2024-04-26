import { PlusOutlined } from '@ant-design/icons';
import { Button, Col } from 'antd';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface DataTableLinkProps {
	loading?: boolean;
	path?: string;
	type?: 'link' | 'button';
	size?: 'small' | 'middle' | 'large';
	buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
	disabled?: boolean;
	onClick?: () => void;
}

const CreateButton = styled(Button)`
	padding: ${(props) => (props.size === 'middle' || !props.size) && '0.5rem 1rem'};
	height: auto;
	font-weight: 400;
`;

const DataTableLink = ({
	type = 'link',
	size,
	path,
	children,
	buttonType,
	...resProps
}: PropsWithChildren<DataTableLinkProps>) => {
	return (
		<Col>
			{type === 'link' ? (
				<Link to={path!}>
					<CreateButton type='primary' size={size} icon={<PlusOutlined />}>
						{children}
					</CreateButton>
				</Link>
			) : (
				<CreateButton
					{...resProps}
					type={buttonType || 'primary'}
					size={size}
					icon={<PlusOutlined />}
				>
					{children}
				</CreateButton>
			)}
		</Col>
	);
};

export default DataTableLink;
