import { ArrowDown } from '@assets/svgs/ArrowDown';
import './primary-button.scss';

type PrimaryButtonProps = {
  label?: string;
  backgroundColor?: string;
  onClick?: () => void;
};

export const PrimaryButton = ({
  label = 'Button',
  backgroundColor = '#0e0e2c',
  onClick = () => null
}: PrimaryButtonProps) => {
  return (
    <button
      className="primary-button"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <span>{label}</span>
      <ArrowDown />
    </button>
  );
};
