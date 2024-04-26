import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './paths';

type publicKeys = keyof typeof PUBLIC_ROUTES;
type privateKeys = keyof typeof PRIVATE_ROUTES;

export const routeNavigate = (path: publicKeys | privateKeys, params?: string) => {
	const NEW_PRIVATE_ROUTES = Object.keys(PRIVATE_ROUTES).reduce((acc, key) => {
		const value = PRIVATE_ROUTES[key as privateKeys];
		acc[key as privateKeys] = `/dashboard${value ? `/${value}` : ''}`;
		return acc;
	}, {} as Record<privateKeys, string>);

	const paths = { ...PUBLIC_ROUTES, ...NEW_PRIVATE_ROUTES };

	const pathname = paths[path];
	const pathnameArray = pathname.split('/:');

	if (params) {
		return `${pathnameArray[0]}/${params}`;
	}

	return pathnameArray[0];
};
