import { App } from 'antd';
import { useCallback } from 'react';

import useAppStore from '@/store/useAppStore';

export const useMessage = (key: string) => {
	const updateRoute = useAppStore((state) => state.updateRoute);
	const { message } = App.useApp();

	const showMessage = useCallback(
		(msg?: string) => {
			updateRoute('complete');
			if (msg) {
				message.success({ content: msg, key });
			}
		},
		[key]
	);

	const showError = useCallback(
		(error: string) => {
			updateRoute('error');
			message.error({ content: error, key });
		},
		[key]
	);

	/**
	 * This function will be used to handle the error message or the
	 * success message to be shown in the UI. It needs to be called
	 * in the component that will be using the `useMessage` hook.
	 */
	const APIRequest = useCallback(
		(request: () => Promise<string | void>) => {
			updateRoute('start');
			request()
				.then((msg) => showMessage(msg as string | undefined))
				.catch((err) => showError(err.message));
		},
		[showError, showMessage]
	);

	return {
		showMessage,
		showError,
		APIRequest,
	};
};
