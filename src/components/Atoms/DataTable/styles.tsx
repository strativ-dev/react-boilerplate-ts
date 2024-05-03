import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	gap: 1rem;
`;

export const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid ${(props) => props.theme.colorBorder};
	overflow: hidden;
	border-radius: 0.5rem;
	.ant-table {
		border-radius: 0px !important;
	}
	.ant-table-header {
		border-radius: 0px !important;
	}
	table {
		border-radius: 0px !important;
	}
	.ant-table-cell {
		border-radius: 0px !important;
	}
`;

export const TableTopSection = styled.div`
	display: flex;
	flex-direction: column;
	background: ${(props) => props.theme.colorBgBase};
	padding: 1rem;
	border-radius: 0.5rem 0.5rem 0 0;
`;

export const TableTitle = styled.div`
	margin: 0 0.5rem;
	font-size: 1rem;
	font-weight: 600;
	color: ${(props) => props.theme.colorTextBase};
`;

export const AntTableContainer = styled.div<{ count: number; noRowHover: boolean }>`
	max-width: 100%;
	min-height: 1px;
	height: 100%;
	.ant-table-wrapper {
		height: 100%;
		.ant-spin-nested-loading {
			height: 100%;
			.ant-spin-container {
				height: 100%;
				display: flex;
				flex-flow: column nowrap;
				.ant-table {
					flex: auto;
					overflow: hidden;
					.ant-table-container {
						height: 100%;
						display: flex;
						flex-flow: column nowrap;
						.ant-table-header {
							flex: none;
							.ant-table-thead {
								.ant-table-cell {
									font-weight: 400;
									font-size: 0.725rem;
									color: ${(props) =>
										props.theme.mode === 'light'
											? lighten('0.35', props.theme.colorTextBase)
											: darken('0.35', props.theme.colorTextBase)};
								}
							}
						}
						.ant-table-body {
							flex: auto;
							overflow: auto;
							table {
								height: ${(props) => (!props.count ? '100%' : 'auto')};
							}

							& > table > tbody > tr:hover > td {
								background-color: ${(props) =>
									props.noRowHover || !props.count ? 'unset' : props.theme.colorBgTextHover};
							}
						}
					}
				}
				.ant-table-pagination {
					background: ${(props) => props.theme.colorBgBase};
					flex: none;
					padding: 1rem;
					margin: 0 !important;
					border-radius: 0 0 0.5rem 0.5rem;
				}
			}
		}
	}
`;

export const TableWrapper = styled.div<{ count: number }>`
	max-width: 100%;
	min-height: 1px;
	height: 100%;
	.ant-table-wrapper {
		height: 100%;
		.ant-spin-nested-loading {
			height: 100%;
			.ant-spin-container {
				height: 100%;
				display: flex;
				flex-flow: column nowrap;
				.ant-table {
					flex: auto;
					overflow: hidden;
					.ant-table-container {
						height: 100%;
						display: flex;
						flex-flow: column nowrap;
						.ant-table-header {
							flex: none;
						}
						.ant-table-body {
							flex: auto;
							overflow: auto;
							table {
								height: ${(props) => (!props.count ? '100%' : 'auto')};
							}
						}
					}
				}
				.ant-table-pagination {
					flex: none;
				}
			}
		}
	}
`;
