import { message } from 'antd';
import { useQuery } from 'react-query';

import { authAPI } from '@/libs/api';

const useConfigurations = () =>
	useQuery('administration-public', () => authAPI.configuration(), {
		staleTime: Infinity,
		cacheTime: 0,
		retryOnMount: false,
		onError: (error: Error) => {
			message.error(error.message);
		},
	});

export default useConfigurations;
