import { Skeleton as ANTSkeleton, Col, Form, Row } from 'antd';
import { SkeletonInputProps } from 'antd/lib/skeleton/Input';
import { FC } from 'react';
const FormLabelSkeleton: FC<SkeletonInputProps> = ({ style = {}, ...rest }) => (
	<ANTSkeleton.Input active style={{ height: 17, marginBottom: 12, ...style }} {...rest} />
);
const FormInputSkeleton: FC<SkeletonInputProps> = ({ style = {}, ...rest }) => (
	<ANTSkeleton.Input active block size='large' style={{ borderRadius: 5, ...style }} {...rest} />
);

const Skeleton = () => {
	return (
		<Row gutter={[16, 16]} justify='center'>
			<Col xl={12} xxl={8}>
				{Array.from({ length: 5 }).map((_, index) => (
					<Form.Item key={index}>
						<FormLabelSkeleton />
						<FormInputSkeleton />
					</Form.Item>
				))}
			</Col>
		</Row>
	);
};

export default Skeleton;
