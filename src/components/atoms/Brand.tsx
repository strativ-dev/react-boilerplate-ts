import { ImageProps } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import BrandImage from '~/assets/images/strativ.png';

export type BrandProps = {
	to?: string;
} & ImageProps;

const BrandWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 0.8rem;
	img {
		height: 100%;
		width: 100%;
		max-width: 160px;
		max-height: 70px;
		object-fit: contain;
	}
`;

export const Brand: FC<BrandProps> = ({ to: slug }) => {
	return (
		<BrandWrapper>
			<Link to={slug ?? '#'}>
				<img src={BrandImage} />
			</Link>
		</BrandWrapper>
	);
};
