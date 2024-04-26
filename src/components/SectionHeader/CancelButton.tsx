import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface CancelButtonProps {
	backPath?: string;
}

const CancelButton = ({ backPath }: CancelButtonProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleCancel = () => {
		backPath ? navigate(backPath) : navigate(-1);
	};

	return (
		<Button type='default' onClick={handleCancel}>
			<CloseOutlined />
			{t('Cancel')}
		</Button>
	);
};

export default CancelButton;
