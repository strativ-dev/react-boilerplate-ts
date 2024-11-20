import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Spin, SpinProps } from '@/components/Atoms/Spin';

describe('Spin component', () => {
  const renderSpin = (props?: SpinProps) => {
    const { container } = render(<Spin {...props} />);

    return {
      spin: container.querySelector('.ant-spin'),
    };
  };

  it('renders with default props', () => {
    const { spin } = renderSpin();

    expect(spin).toBeInTheDocument();
  });

  it('renders with window-centre type', () => {
    const { spin } = renderSpin({ type: 'window-centre' });

    expect(spin).toHaveStyle({
      position: 'absolute',
      top: 'calc(50% - 20px)',
      left: 'calc(50% - 16px)',
    });
  });

  it('renders with content-centre type', () => {
    const { spin } = renderSpin({ type: 'content-centre' });

    expect(spin).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });
  });
});
