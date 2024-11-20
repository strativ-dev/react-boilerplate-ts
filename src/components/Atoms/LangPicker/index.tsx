import { Select, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Wrapper } from './styles';
import { useLanguage } from '@/hooks/useLanguage';
import { LANGUAGE_OPTIONS } from '@/lib/utils/constants';

export const LangPicker: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common',
  });

  const { language, handleChange } = useLanguage();

  return (
    <Wrapper className="lang-picker">
      <Typography.Text>{t('choose_language')}</Typography.Text>
      <Select
        defaultValue={language}
        style={{ width: 65 }}
        onChange={handleChange}
        options={Object.values(LANGUAGE_OPTIONS).map((value) => ({
          label: value,
          value,
        }))}
      />
    </Wrapper>
  );
};
