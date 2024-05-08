import useAppStore from './useAppStore';
import useAuthStore from './useAuthStore';

const Store = () => {
	const app = useAppStore();
	const auth = useAuthStore();

	return {
		auth,
		app,
	};
};

export default Store;
