import { Card as AntCard, CardProps as AntCardProps } from 'antd';

export type CardProps = AntCardProps & {
	skeleton?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ loading, skeleton, ...rest }) => {
	if (loading && skeleton) {
		return <AntCard {...rest}>{skeleton}</AntCard>;
	}

	return <AntCard {...{ loading, ...rest }} />;
};
