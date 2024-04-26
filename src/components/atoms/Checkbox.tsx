import { Checkbox as AntCheckbox, ConfigProvider } from 'antd';
import classNames from 'classnames';
import { ComponentProps, FC, useContext } from 'react';

type AntCheckboxProps = ComponentProps<typeof AntCheckbox>;

export type CheckboxProps = AntCheckboxProps & {
	custom?: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({ className, custom, ...rest }) => {
	const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
	const prefixCls = getPrefixCls('checkbox');

	return (
		<AntCheckbox
			{...rest}
			className={classNames(
				{
					[`${prefixCls}-custom`]: custom,
				},
				className
			)}
		/>
	);
};
