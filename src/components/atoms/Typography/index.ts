import { Typography as AntTypography, TypographyProps as AntTypographyProps } from 'antd';
import { Title } from './Title';

export type TypographyProps = Omit<AntTypographyProps, 'Title'> & {
	Title: typeof Title;
};

export const Typography = {
	...AntTypography,
	Title,
} as TypographyProps;
