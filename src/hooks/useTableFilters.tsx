/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormInstance } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type ITableFilters<T> = {
	initialValues: T;
	form: FormInstance;
};

export const useTableFilters = <T extends Record<string, any>>({
	initialValues,
	form,
}: ITableFilters<T>) => {
	const [filters, setFilters] = useState(initialValues);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const newFilters: Record<string, any> = {};
		Object.keys(initialValues).forEach((key) => {
			const value = searchParams.get(key.toString());
			if (value) {
				newFilters[key] = value;
			} else {
				newFilters[key] = initialValues[key];
			}
		});

		setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
		form.setFieldsValue(newFilters);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form, searchParams]);

	const navigateTo = useCallback(
		(newFilters: Partial<T>) => {
			const params = new URLSearchParams();
			for (const [key, value] of searchParams.entries()) {
				if (key in initialValues && value) {
					params.set(key, value);
				} else {
					params.delete(key);
				}
			}

			for (const [key, value] of Object.entries(newFilters)) {
				if (value) {
					params.set(key, value);
				} else {
					params.delete(key);
				}
			}

			navigate({ search: params.toString() });
		},
		[initialValues, navigate, searchParams]
	);

	const debounce = (fn: (...args: any[]) => void, delay: number) => {
		let timer: ReturnType<typeof setTimeout>;
		return (...args: any[]) => {
			clearTimeout(timer);
			timer = setTimeout(() => fn(...args), delay);
		};
	};

	const handleFilterChange = useCallback(
		(values: Partial<T>) => {
			setFilters((prevFilters) => ({ ...prevFilters, ...values }));
			navigateTo(values);
		},
		[navigateTo]
	);

	const handleFilterChnageDebounced = debounce(handleFilterChange, 500);

	const handleFilterReset = useCallback(() => {
		setFilters(initialValues);
		navigateTo(initialValues);
	}, [initialValues, navigateTo]);

	return { filters, handleFilterChange, handleFilterChnageDebounced, handleFilterReset };
};
