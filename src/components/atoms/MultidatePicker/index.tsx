/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, DatePickerProps, Select, Tag } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useState } from 'react';
import './index.css';

function getTimestamp(value: dayjs.Dayjs) {
	return value.startOf('day').valueOf();
}

export default function MultipleDatePicker({
	value: selectedDate = [],
	onChange,
	format = 'YYYY-MM-DD',
	selectProps = {},
	datePickerProps = {},
}: {
	value?: any;
	onChange?: any;
	selectProps?: any;
	format?: string;
	datePickerProps?: DatePickerProps;
}) {
	const [open, setOpen] = useState(false);

	const onValueChange = (date: any) => {
		const t = getTimestamp(date);
		const index = selectedDate.indexOf(t);
		const clone = _.clone(selectedDate);
		if (index > -1) {
			clone.splice(index, 1);
		} else {
			clone.push(t);
		}
		onChange && onChange(clone);
	};

	const dateRender = (currentDate: any) => {
		const isSelected = selectedDate.indexOf(getTimestamp(currentDate)) > -1;
		return (
			<div
				className={'ant-picker-cell-inner'}
				style={
					isSelected
						? {
								position: 'relative',
								zIndex: 2,
								display: 'inlineBlock',
								width: '24px',
								height: '22px',
								lineHeight: '22px',
								backgroundColor: 'var(--ant-primary-color)',
								color: '#fff',
								margin: 'auto',
								borderRadius: '2px',
								transition: 'background 0.3s, border 0.3s',
						  }
						: {}
				}
			>
				{currentDate.date()}
			</div>
		);
	};

	const renderTag = ({ value, onClose }: { value: any; onClose: any }) => {
		const handleClose = () => {
			onClose();
			onChange && onChange(selectedDate.filter((t: any) => t !== value));
		};
		return (
			<Tag onClose={handleClose} closable>
				{dayjs(value).format(format)}
			</Tag>
		);
	};

	return (
		<Select
			allowClear
			placeholder={'Select date(s)'}
			{...selectProps}
			mode='multiple'
			value={selectedDate}
			onClear={() => onChange && onChange([])}
			tagRender={renderTag}
			open={open}
			onFocus={() => setOpen(true)}
			onBlur={() => setOpen(false)}
			dropdownMatchSelectWidth={false}
			getPopupContainer={(triggerNode) => triggerNode.parentElement}
			popupClassName={'multipleDropdownClassName'}
			dropdownStyle={{ height: '270px', width: '280px', minWidth: '0' }}
			dropdownRender={() => {
				return (
					<DatePicker
						{...datePickerProps}
						onChange={onValueChange}
						open
						dateRender={dateRender}
						style={{ ...datePickerProps?.style, visibility: 'hidden' }}
						getPopupContainer={() =>
							document.getElementsByClassName('multipleDropdownClassName')?.[0] as any
						}
					/>
				);
			}}
		/>
	);
}
