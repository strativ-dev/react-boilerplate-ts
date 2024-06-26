import { Col } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { LangPicker } from '@/components/Atoms';
import { withoutAuth } from '@/components/Hoc';
import useConfigurations from '@/components/Providers/useConfigurations';
import { BGWithImage, LoginWrapper, RowWrapper } from './styles';

const SignInLayout: FC = withoutAuth(() => {
	const { data } = useConfigurations();

	return (
		<RowWrapper align='middle' justify='center'>
			<LangPicker />
			<Col xs={0} lg={12}>
				<BGWithImage imageSrc={data?.login_page_bg_image} />
			</Col>
			<Col xs={24} lg={12}>
				<LoginWrapper>
					<Outlet />
				</LoginWrapper>
			</Col>
		</RowWrapper>
	);
});

export default SignInLayout;
