import { Col, Row, Skeleton } from 'antd';
import FormSection from './FormSection';

export const TourUpdateSkeleton = () => {
	return (
		<>
			<FormSection title={<Skeleton.Input active />}>
				<Row gutter={[16, 16]}>
					<Col span={18}>
						<Skeleton.Input active block />
					</Col>
				</Row>
			</FormSection>
			{Array.from({ length: 3 }).map((_, index) => (
				<FormSection title={<Skeleton.Input active />} key={index}>
					<Row gutter={[16, 24]}>
						{Array.from({ length: 5 }).map((_, index) => (
							<Col span={12} key={index}>
								<Skeleton.Input active block />
							</Col>
						))}
						<Col span={24} key={index}>
							<Skeleton.Input
								active
								block
								style={{
									height: '100px',
								}}
							/>
						</Col>
					</Row>
				</FormSection>
			))}
		</>
	);
};
