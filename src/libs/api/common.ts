/* eslint-disable @typescript-eslint/no-explicit-any */
export class Common {
	private url = '';
	private searchParams = new URLSearchParams();
	constructor(private itemsPerPage: number) {}

	protected setURL(url: string) {
		this.url = url;
		return this;
	}

	private getOffset(page: number, limit: number) {
		return (page - 1) * limit;
	}

	protected paginate(page = 1, limit = this.itemsPerPage) {
		const offset = this.getOffset(page, limit);
		this.searchParams = new URLSearchParams();

		if (offset === 0) {
			this.searchParams.set('limit', limit.toString());
		}

		if (offset > 0) {
			this.searchParams.set('offset', offset.toString());
			this.searchParams.set('limit', limit.toString());
		}

		return this;
	}

	protected params<T extends Record<string, any>>(params: T, paginate = true) {
		this.searchParams = new URLSearchParams();

		const page = params?.page || 1;
		const limit = params?.limit as number;
		if (paginate) this.paginate(page, limit);

		Object.keys(params).forEach((key) => {
			const value = params[key] as any;

			if (!['page', 'limit'].includes(key) && value) {
				if (Array.isArray(value)) {
					value.forEach((item) => this.searchParams.append(key, item.toString()));
				} else if (typeof value === 'object') {
					Object.keys(value).forEach((item) => this.searchParams.append(key, item.toString()));
				} else {
					this.searchParams.append(key, value.toString());
				}
			}
		});

		return this;
	}

	protected getURL() {
		const paramsString = this.searchParams.toString();
		return this.url + (paramsString ? `?${paramsString}` : '');
	}
}
