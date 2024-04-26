import { css } from 'styled-components';

export const margins = (value: number) => css`
	&-top {
		margin-top: ${value}rem !important;
	}

	&-bottom {
		margin-bottom: ${value}rem !important;
	}

	&-left {
		margin-left: ${value}rem !important;
	}

	&-right {
		margin-right: ${value}rem !important;
	}
`;
