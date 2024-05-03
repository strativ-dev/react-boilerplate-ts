import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import { t } from 'i18next';

/**
 * You can use this function to get the current month
 * name in the current locale.
 */
export const getMonthName = (value: Date, type?: InitMonthType) => {
	return value.toLocaleString('default', { month: type || 'long' });
};

export const timer = (date: Date) => {
	const format = (val: number) => (val < 10 ? `0${val}` : val);

	const hr = format(date.getHours());
	const min = format(date.getMinutes());
	const sec = format(date.getSeconds());
	const milliSec = date.getMilliseconds();
	return `${hr}:${min}:${sec}.${milliSec}`;
};

export const removeSeconds = (date: string) => {
	return dayjs(`1/1/1 ${date}`).format('HH:mm');
};

export const dateFormater = (date: string, format?: string) => {
	return dayjs(date).format(format || 'MMM DD, YYYY');
};

export const DateRangeValidation = async (_: any, values: [Dayjs, Dayjs]) => {
	if (!values) return;
	const startDate = values[0];
	const endDate = values[1];
	const daysDifference = endDate.diff(startDate, 'day');

	if (daysDifference < 4) {
		return Promise.reject(t('Date range should be equal or greater then 5 days'));
	}

	return Promise.resolve();
};

export const previousDate: RangePickerProps['disabledDate'] = (current) => {
	// Can not select days before today and today
	return current && current < dayjs().endOf('day');
};
