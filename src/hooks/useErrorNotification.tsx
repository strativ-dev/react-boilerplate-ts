import { App } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type UseErrorNotificationProps = {
  isError: boolean;
  errorMessage?: string;
};

const useErrorNotification = ({
  isError,
  errorMessage,
}: UseErrorNotificationProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common',
  });
  const { message } = App.useApp();

  useEffect(() => {
    if (!isError) {
      return;
    }

    const errorMessageToShow = errorMessage || t('something_went_wrong');

    if (message.error) {
      message.error(errorMessageToShow);
    } else {
      alert(errorMessageToShow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);
};

export default useErrorNotification;
