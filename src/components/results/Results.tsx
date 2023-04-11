import { useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { Share } from '@assets/svgs/Share';
import { Instagram } from '@assets/svgs/Instagram';
import { WhatsApp } from '@assets/svgs/WhatsApp';
import { useClickOutside } from '@components/hooks/useClickOutside';
import './results.scss';

interface IResultsProps {
  onGoAgain: (value: boolean) => void;
}

export const Results = ({ onGoAgain }: IResultsProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const socialRef = useRef<HTMLDivElement>(null);

  const handleShowSocial = () => setOpen(true);

  const handleHideSocial = () => setOpen(false);

  const handleGoAgain = () => onGoAgain(false);

  useEffect(() => {
    if (socialRef.current) {
      if (
        !open &&
        socialRef.current.classList.contains('hide-social')
      ) {
        socialRef.current.classList.add('hide-social');
      } else {
        socialRef.current.classList.remove('hide-social');
      }
    }
  }, [open]);

  useClickOutside(socialRef, handleHideSocial);

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
            onClick={handleShowSocial}
          >
            <Share />
          </div>
          {open ? (
            <div
              ref={socialRef}
              className="results-ctas--share-social"
            >
              <Instagram />
              <WhatsApp />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
