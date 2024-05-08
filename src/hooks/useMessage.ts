import { App } from 'antd';
import { useCallback } from 'react';
import store from '~/store';

export const useMessage = (key: string) => {
	const { message } = App.useApp();

	const showMessage = useCallback(
		(msg?: string) => {
			store().app.updateRoute('complete');
			if (msg) {
				message.success({ content: msg, key });
			}
		},
		[key, message]
	);

	const showError = useCallback(
		(error: string) => {
			store().app.updateRoute('error');
			message.error({ content: error, key });
		},
		[key, message]
	);

	/**
	 * This function will be used to handle the error message or the
	 * success message to be shown in the UI. It needs to be called
	 * in the component that will be using the `useMessage` hook.
	 */
	const APIRequest = useCallback(
		(request: () => Promise<string | void>) => {
			store().app.updateRoute('start');
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
