import { Row } from 'antd';
import styled from 'styled-components';
import loginBG from '~/assets/images/login-bg.jpg';

export const RowWrapper = styled(Row)`
	min-height: 100vh;
	position: relative;
	background-color: #fff;

	.lang-picker {
		position: absolute;
		right: 1rem;
		top: 1rem;
		z-index: 999;

		& > .ant-typography {
			display: none;
		}
	}
`;

export const BGWithImage = styled.div<{ imageSrc?: string }>`
	width: 100%;
	min-height: 100vh;
	background-image: ${(props) => (props.imageSrc ? `url(${props.imageSrc})` : `url(${loginBG})`)};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

export const LoginWrapper = styled.div`
	max-width: 24rem;
	margin: 0 auto;
	padding: 1rem 1rem 1.5rem;
`;
