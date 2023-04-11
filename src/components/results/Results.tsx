import { useState } from 'react';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { Share } from '@assets/svgs/Share';
import './results.scss';

interface IResultsProps {
  onGoAgain: (value: boolean) => void;
}

export const Results = ({ onGoAgain }: IResultsProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleShareHover = () => setOpen(true);

  const handleShareLeave = () => setOpen(false);

  const handleGoAgain = () => onGoAgain(false);

  return (
    <div className="results">
      <div className="results-name">
        <p>
          <b>Dante - </b>
          This name means "enduring" or "steadfast" and is
          of Italian origin. It could be a great name for a
          baby boy whose parents have strong ties to
          Argentina. Dante Alighieri was a famous Italian
          poet who wrote "The Divine Comedy", which is
          considered one of the greatest works in Western
          literature.
        </p>
      </div>
      <div className="results-ctas">
        <div className="results-ctas--primary">
          <PrimaryButton
            label="Go again"
            onClick={handleGoAgain}
          />
        </div>
        <div className="results-ctas--share">
          <div
            className="results-ctas--share-button"
            onMouseEnter={handleShareHover}
            onMouseLeave={handleShareLeave}
          >
            <Share />
          </div>
          {open ? (
            <div className="results-ctas--share-social">
              Social
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
