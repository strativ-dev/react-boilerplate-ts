import styled from 'styled-components';
import AdminDashboard from './admin-dashboard';

const Dashboard = () => {
	return (
		<Wrapper>
			<AdminDashboard />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: 'flex';
	flex-direction: 'column';
	gap: 16;
`;

export default Dashboard;
