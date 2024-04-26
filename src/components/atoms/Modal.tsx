import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';
export const Modal = styled(AntdModal)`
	.ant-modal-header {
		border-bottom: 1px solid ${({ theme }) => theme.colorBorder};
		margin: 0 -1.5rem 1rem -1.5rem;
		padding: 0 1.5rem 1rem 1.5rem;
	}
`;
