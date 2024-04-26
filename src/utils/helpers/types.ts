export type ParsedUrlQuery = {
	[key: string]: string | string[] | undefined;
};

export type InitMonthType = Intl.DateTimeFormatOptions['month'];

export type SearchObject = {
	[key: string]: string | number | undefined;
};
