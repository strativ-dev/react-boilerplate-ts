import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ArrowLeft from '~/assets/images/icons/arrow-left.svg';
import { Typography } from '../Atoms';

const BackButtonWrapper = styled.div`
	margin-bottom: 6px;
	background-color: ${(props) => props.theme.colorBgBase};
	.back-container {
		display: flex;
		align-items: center;
		column-gap: 6px;
		text-align: center;
		cursor: pointer;
		width: fit-content;
		padding: 0 8px 0 0;
	}
`;

interface BackButtonProps {
	backPath?: string;
}

const BackButton = ({ backPath }: BackButtonProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<BackButtonWrapper>
			<div
				className='back-container'
				onClick={() => (backPath ? navigate(backPath) : navigate(-1))}
			>
				<img src={ArrowLeft} alt='ArrowLeft' />
				<div>
					<Typography.Text>{t('Back')}</Typography.Text>
				</div>
			</div>
		</BackButtonWrapper>
	);
};

export default BackButton;
