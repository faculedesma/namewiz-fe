import { ArrowDown } from '@assets/svgs/ArrowDown';
import './primary-button.scss';

type PrimaryButtonProps = {
  label?: string;
  backgroundColor?: string;
};

export const PrimaryButton = ({
  label = 'Button',
  backgroundColor = '#0e0e2c'
}: PrimaryButtonProps) => {
  return (
    <button
      className="primary-button"
      style={{ backgroundColor }}
    >
      <span>{label}</span>
      <ArrowDown />
    </button>
  );
};
