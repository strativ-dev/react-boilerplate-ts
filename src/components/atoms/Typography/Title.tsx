import { Typography, theme } from 'antd';
import { BaseType } from 'antd/lib/typography/Base';
import { ComponentProps, FC } from 'react';

type AntTitle = ComponentProps<typeof Typography.Title>;

export type TitleProps = Omit<AntTitle, 'type'> & {
	type?: BaseType | 'primary' | 'white';
	noMargin?: boolean;
	noMarginTop?: boolean;
	noMarginBottom?: boolean;
};

export const Title: FC<TitleProps> = ({
	type,
	noMargin,
	noMarginTop,
	noMarginBottom,
	className,
	style,
	...rest
}) => {
	const { token } = theme.useToken();

	return (
		<Typography.Title
			{...rest}
			style={{
				color:
					type === 'primary'
						? token.colorPrimary
						: type === 'white'
						? token.colorBgBase
						: undefined,
				marginBottom: noMargin || noMarginBottom ? 0 : undefined,
				marginTop: noMargin || noMarginTop ? 0 : undefined,
				...style,
			}}
			className={className}
		/>
	);
};
