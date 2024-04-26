import { Button, ButtonProps } from 'antd';

const SectionButton = ({ children, ...restProps }: ButtonProps) => {
	return <Button {...restProps}>{children}</Button>;
};

export default SectionButton;
