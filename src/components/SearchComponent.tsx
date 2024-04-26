import config from '@/config';
import { selectFilterBy } from '@/utils/helpers';
import { DownloadOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import {
	Form as AntForm,
	Button,
	Col,
	DatePicker,
	Input,
	Row,
	Select,
	Switch,
	Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

interface CommonField {
	name: string;
	tooltipTitle?: string;
}
export interface FieldOption {
	id?: string | number;
	value: string | number;
	label: string;
}

interface SelectField extends CommonField {
	type: 'select';
	options: FieldOption[];
	isLoading?: boolean;
	placeholder: string;
	param: string;
	value?: string | number;
}
interface DateRangeField extends CommonField {
	type: 'date-range';
	param: string[];
	placeholder: string[];
	value?: [dayjs.Dayjs, dayjs.Dayjs];
}

interface SwitchField extends CommonField {
	type: 'switch';
	placeholder: string;
	param: string;
	value?: boolean | '1';
}
interface InputField extends CommonField {
	type: 'input';
	placeholder: string;
	param: string;
	value?: string | number;
}

export type FilterField = InputField | SelectField | DateRangeField | SwitchField;

interface SearchComponentProps {
	fields: FilterField[];
	downloadFunction?: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ fields, downloadFunction }) => {
	const [form] = AntForm.useForm();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();

	//Pre-feild the input filed when any user search with any filed previous and reload the page if necessary/go to new tab with this search
	useEffect(() => {
		const queryParams: Record<string, any> = {};
		// Loop through fieldMappings and set the values from searchParams
		fields.forEach(({ name, param, type }) => {
			let paramValue;
			if (Array.isArray(param)) {
				const [fromParam, toParam] = param;
				const fromValue = searchParams.get(fromParam);
				const toValue = searchParams.get(toParam);
				if (fromValue && toValue) {
					paramValue = [dayjs(fromValue, config.dateFormat), dayjs(toValue, config.dateFormat)];
				}
			} else {
				let paramStringValue: number | string | null;
				if (type === 'select' && param) {
					if (!isNaN(Number(searchParams.get(param)))) {
						paramStringValue = Number(searchParams.get(param));
					} else {
						paramStringValue = searchParams.get(param);
					}
				} else {
					paramStringValue = searchParams.get(param as string);
				}
				paramValue = paramStringValue ? paramStringValue : undefined;
			}
			queryParams[name] = paramValue !== null ? paramValue : undefined;
		});

		form.setFieldsValue(queryParams);
	}, [form, searchParams, fields]);

	const handleSubmit = useCallback(
		(values: any) => {
			const params = new URLSearchParams(searchParams);
			params.delete('page');
			Object.entries(values).forEach(([key, value]) => {
				if (!value) params.delete(key);
			});
			for (const field of fields) {
				const key = field.name;
				const value = values[key];

				if (field.type === 'date-range') {
					const [fromDateFieldName, toDateFieldName] = field.param || [];
					const dateRange = values[field.name];
					if (Array.isArray(dateRange) && dateRange.length === 2) {
						params.set(fromDateFieldName, dateRange[0].format(config.dateFormat));
						params.set(toDateFieldName, dateRange[1].format(config.dateFormat));
					}
				}
				if (field.type === 'switch' && field.value !== undefined && value === true) {
					params.set(key, field.value.toString());
				}
				if (field.type === 'switch' && field.value !== undefined && value === false) {
					params.delete(key);
				}
				if (field.type === 'input' && value) {
					params.set(key, value);
				}
				if (field.type === 'select' && value) {
					params.set(key, value);
				}
			}
			navigate({ search: params.toString() });
		},
		[navigate, searchParams, fields]
	);

	const handleReset = useCallback(() => {
		form.resetFields();
		navigate('');
	}, [form, navigate]);

	function selectOptions(options: FieldOption[] = []) {
		return options.map((option) => ({
			value: option.value,
			label: option.label,
		}));
	}

	const handleOnChange = (fieldName: string, value: boolean) => {
		const fieldObj = fields.find((field) => field.name === fieldName);
		if (!value) {
			if (fieldObj?.type === 'date-range') {
				searchParams.delete(fieldObj?.param[0] as string);
				searchParams.delete(fieldObj?.param[1] as string);
			} else {
				searchParams.delete(fieldObj?.param as string);
			}
			navigate({ search: searchParams.toString() });
		}
	};

	return (
		<Form form={form} size='large' layout='horizontal' onFinish={handleSubmit}>
			<Row gutter={12} justify='space-between'>
				<Col style={{ width: 'calc(100% - 180px)' }}>
					<Row gutter={12}>
						{fields.map((field) => (
							<Col span={Math.floor(24 / fields.length)} key={field.name}>
								{field.type === 'input' && (
									<Tooltip placement='top' title={field.tooltipTitle && field.tooltipTitle}>
										<Form.Item name={field.name}>
											<Input
												type='text'
												placeholder={field.placeholder as string}
												onChange={(e) => handleOnChange(field.name, !!e.target.value)}
												allowClear
											/>
										</Form.Item>
									</Tooltip>
								)}
								{field.type === 'select' && (
									<Form.Item name={field.isLoading ? '' : field.name}>
										<Select
											showSearch
											allowClear
											options={selectOptions(field.options)}
											placeholder={field.placeholder}
											filterOption={selectFilterBy}
											onChange={(value) => handleOnChange(field.name, !!value)}
											loading={field.isLoading}
										/>
									</Form.Item>
								)}
								{field.type === 'date-range' && (
									<Form.Item name={field.name}>
										<RangePicker
											format={['YYYY-MM-DD', 'YYYYMMDD', 'YYMMDD', 'YYYY/MM/DD']}
											style={{ width: '100%' }}
											placeholder={
												field.placeholder
													? [field.placeholder[0] as string, field.placeholder[1]]
													: undefined
											}
											size='large'
											allowClear
											onChange={(value) => handleOnChange(field.name, !!value)}
										/>
									</Form.Item>
								)}
								{field.type === 'switch' && (
									<Form.Item
										name={field.name}
										label={<span style={{ padding: '7px 0 0 0' }}>{field.placeholder}: </span>}
										colon={false}
									>
										<Switch
											checked={searchParams.get(field.name) ? true : false}
											onChange={() => handleSubmit(form.getFieldsValue())}
										/>
									</Form.Item>
								)}
							</Col>
						))}
					</Row>
				</Col>
				<Col>
					<Tooltip title={t('Search')} placement='bottom'>
						<Button ghost type='primary' htmlType='submit'>
							<SearchOutlined />
						</Button>
					</Tooltip>
					{downloadFunction && (
						<Tooltip title={t('Download')} placement='bottom'>
							<Button ghost type='primary' onClick={downloadFunction} style={{ marginLeft: 12 }}>
								<DownloadOutlined />
							</Button>
						</Tooltip>
					)}
					<Tooltip title={t('Reset')} placement='bottom'>
						<Button ghost type='primary' style={{ marginLeft: 12 }} onClick={handleReset}>
							<ReloadOutlined />
						</Button>
					</Tooltip>
				</Col>
			</Row>
		</Form>
	);
};

export default SearchComponent;

const Form = styled(AntForm)`
	.ant {
		&-form {
			&-item {
				margin-bottom: 0;
			}
		}
	}
`;
