export const useFormValidator = () => {
	const validIntigerNumber = (value: string, errorMessage: string) => {
		if (!value) return Promise.resolve();
		const reg = /^-?(0|[1-9][0-9]*)?$/;
		if (reg.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error(errorMessage));
	};

	return {
		validIntigerNumber,
	};
};
