import { QuestionCircleOutlined } from '@ant-design/icons';
import { Col, ColProps, Divider, Row, Tooltip, Typography } from 'antd';
import { FC } from 'react';

interface Props {
	title: string | React.ReactNode;
	subtitle?: string;
	labelSpan?: ColProps['span'];
	children: React.ReactNode;
	helpMessage?: string;
}

const FormSection: FC<Props> = ({ children, title, subtitle, helpMessage, labelSpan = 8 }) => {
	return (
		<Row>
			<Col span={labelSpan}>
				<Typography.Text strong>{title}</Typography.Text>
				{helpMessage ? (
					<Typography.Text type='secondary'>
						<Tooltip title={helpMessage}>
							<QuestionCircleOutlined
								style={{
									marginLeft: '0.35rem',
								}}
							/>
						</Tooltip>
					</Typography.Text>
				) : null}
				<Typography.Paragraph type='secondary'>{subtitle}</Typography.Paragraph>
			</Col>
			<Col span={24 - Number(labelSpan)}>{children}</Col>
			<Divider />
		</Row>
	);
};

export default FormSection;
