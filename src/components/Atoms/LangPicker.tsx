import { Select, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useLang } from '@/hooks';
import { LANGUAGE_OPTIONS } from '@/utils/constants';

export const LangPicker: FC = () => {
	const { t } = useTranslation();
	const { language, handleChange } = useLang();

	return (
		<Wrapper className='lang-picker'>
			<Typography.Text>{t('Choose Language')}</Typography.Text>
			<Select defaultValue={language} style={{ width: 65 }} onChange={handleChange}>
				{LANGUAGE_OPTIONS &&
					Object.entries(LANGUAGE_OPTIONS).map(([key, value]) => (
						<Select.Option key={key} value={key}>
							{value}
						</Select.Option>
					))}
			</Select>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin-top: 1rem;

	& > .ant-typography {
		padding-right: 0.625rem;
	}
`;
