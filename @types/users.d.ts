interface Permissions {
	codename: string;
	content_type_id: number;
	id: number;
	name: string;
}

interface Group {
	id: number;
	name: string;
}

interface ProfileResponse {
	id: number;
	last_login: Date;
	is_superuser: boolean;
	created_by?: string;
	updated_by?: string;
	first_name: string;
	last_name: string;
	email: string;
	is_staff: boolean;
	is_passenger: boolean;
	is_active: boolean;
	date_joined: Date;
	user_permissions: string[];
	groups: Group[];
	permissions: Permissions[];
	tour_guide_id?: number;
	is_tour_guide: boolean;
}

interface UserUpdatePayload {
	first_name: string;
	last_name: string;
	groups: number[];
	is_superuser: boolean;
	is_staff: boolean;
	is_passenger: boolean;
}

interface GroupsDetail {
	id: number;
	name: string;
}

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	is_staff: boolean;
	is_active: boolean;
	groups: number[];
	groups_details: GroupsDetail[];
	last_login?: Date;
	created_at: Date;
	updated_at: Date;
}

interface UsersResponse {
	total: number;
	next?: any;
	previous?: any;
	data: User[];
}

interface UserCreatePayload {
	first_name: string;
	last_name: string;
	email: string;
	groups: number[];
	is_superuser?: boolean;
	is_passenger?: boolean;
}

interface UsersPragmas extends PaginateParams {
	email?: string;
	name?: string;
	is_passenger?: string;
}
