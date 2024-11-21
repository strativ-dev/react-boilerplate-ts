import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';

type ErrorFallbackProps = {
  resetErrorBoundary: () => void;
  error?: Error | null;
};

export const ErrorFallback = ({
  resetErrorBoundary,
  error,
}: ErrorFallbackProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common',
  });

  return (
    <Result
      status="500"
      title={t('something_went_wrong')}
      subTitle={error?.message}
      extra={
        <Button type="primary" onClick={resetErrorBoundary}>
          {t('try_again')}
        </Button>
      }
    />
  );
};
