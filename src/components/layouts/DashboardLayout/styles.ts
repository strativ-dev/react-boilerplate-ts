import { Layout } from 'antd';
import styled from 'styled-components';

export const NavItemsWrapper = styled.div`
	width: 100%;
	max-height: calc(100vh - 150px);
	display: block;
	overflow: hidden;
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 0.4rem;
	}
	::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: ${(props) => props.theme.colorPrimaryBgHover};
	}
`;

export const NavItems = styled.ul`
	width: 90%;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0 0 0 0;
`;

export const NavItem = styled.li`
	display: block;
	margin-top: ${({ theme }) => theme.size / 4}px;
	margin-bottom: ${({ theme }) => theme.size / 4}px;
	overflow: hidden;

	&:first-child {
		margin-top: 0;
	}

	&:last-child {
		margin-bottom: 0;
	}

	${NavItems} {
		width: calc(100% - 2rem);
		max-height: 0;
		margin-left: 2rem;
		border-left: 1px solid rgb(190, 201, 215);
		overflow: hidden;
		transform: scale(0.95);
		transition: max-height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
			opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

		& > li {
			margin-left: -1px;
		}
	}

	a {
		font-size: ${({ theme }) => theme.fontSizeLG}px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.75rem;
		padding: ${({ theme }) => theme.fontSize / 2}px ${({ theme }) => theme.size}px;
		position: relative;
		color: ${(props) => props.theme.colorText};
		border-start-end-radius: 20rem;
		border-end-end-radius: 20rem;

		svg path {
			fill: ${(props) => props.theme.colorText};
		}

		.nav-text {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			max-width: 115px;
		}

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			opacity: 0;
			border-right: 3px solid ${(props) => props.theme.colorPrimary};
		}

		.arrow {
			font-size: 0.75rem;
			transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
		}

		&:hover {
			color: ${(props) => props.theme.colorPrimary};

			svg path {
				fill: ${(props) => props.theme.colorPrimary};
			}
		}

		&.active {
			font-weight: 600;
			color: ${(props) => props.theme.colorPrimary};
			background-color: ${(props) => props.theme.colorPrimaryBg};

			svg path {
				fill: ${(props) => props.theme.colorPrimary};
			}

			&::after {
				opacity: 1;
			}

			.arrow {
				transform: rotate(180deg);
			}

			& ~ ${NavItems} {
				max-height: 40rem;
				margin-top: 0.25rem;
				overflow: inherit;
			}
		}
	}
`;

export const LayoutHeaderWrapper = styled(Layout.Header)`
	padding: 0 1rem;
	background: ${(props) => props?.theme?.colorBgContainer};
	z-index: 99;

	.trigger {
		padding: 0 1rem;
		font-size: 1.25rem;
		line-height: 4rem;
		cursor: pointer;
		transition: color 0.3s;
	}

	.lang-picker {
		margin-top: 0;

		& > .ant-typography {
			display: none;
		}
	}

	.ant-dropdown-trigger {
		display: block;
	}
`;

export const LayoutSiderWrapper = styled(Layout.Sider)`
	.brand-wrapper {
		width: 100%;
		height: 100%;
		max-height: 4rem;
		padding: 0 0.5rem;
		margin: 1.5rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&.ant-layout-sider-collapsed {
		${NavItem} {
			a {
				grid-template-columns: 1fr;

				.nav-text,
				.arrow,
				& ~ ${NavItems} {
					display: none;
				}
			}
		}
	}
`;
