import { useFormatCurrency } from '@/hooks';

type DataTableColumnCurrencyProps = {
	amount?: number;
	currency_code?: string;
};

const DataTableColumnCurrency = ({ amount, currency_code }: DataTableColumnCurrencyProps) => {
	const { formatCurrency } = useFormatCurrency(currency_code);
	return <span>{formatCurrency(amount)}</span>;
};

export default DataTableColumnCurrency;
