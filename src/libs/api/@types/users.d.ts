import { PaginateParams } from './common';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProfileResponse {
	id: number;
	last_login: Date;
	is_superuser: boolean;
	created_by?: any;
	updated_by?: any;
	first_name: string;
	last_name: string;
	email: string;
	is_staff: boolean;
	is_passenger: boolean;
	is_active: boolean;
	date_joined: Date;
	user_permissions: any[];
	groups: any[];
	permissions: any[];
	tour_guide_id?: number;
	is_tour_guide: boolean;
}

export interface UserUpdatePayload {
	first_name: string;
	last_name: string;
	groups: number[];
	is_superuser: boolean;
	is_staff: boolean;
	is_passenger: boolean;
}

export interface GroupsDetail {
	id: number;
	name: string;
}

export interface User {
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

export interface UsersResponse {
	total: number;
	next?: any;
	previous?: any;
	data: User[];
}

export interface UserCreatePayload {
	first_name: string;
	last_name: string;
	email: string;
	groups: number[];
	is_superuser?: boolean;
	is_passenger?: boolean;
}

export interface UsersPragmas extends PaginateParams {
	email?: string;
	name?: string;
	is_passenger?: string;
}
