import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  const { t } = useTranslation('translation', {
    keyPrefix: 'common',
  });

  return (
    <Result
      status="404"
      title="404"
      subTitle={t('not_found_page_title')}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          {t('back_home')}
        </Button>
      }
    />
  );
};

export default NotFound;
