import { FormInstance } from 'antd';
import { useEffect, useRef } from 'react';

export const useResetFormOnCloseModal = ({ form, open }: { form: FormInstance; open: boolean }) => {
	const prevOpenRef = useRef<boolean>();

	useEffect(() => {
		prevOpenRef.current = open;
	}, [open]);

	const prevOpen = prevOpenRef.current;

	useEffect(() => {
		if (!open && prevOpen) {
			form.resetFields();
		}
	}, [form, prevOpen, open]);
};
