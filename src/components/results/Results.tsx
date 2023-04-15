import { useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { Share } from '@assets/svgs/Share';
import { Instagram } from '@assets/svgs/Instagram';
import { WhatsApp } from '@assets/svgs/WhatsApp';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import './results.scss';

const mockedResults = [
  {
    id: 'dante',
    name: 'Dante',
    description: `This name means "enduring" or "steadfast" and is
    of Italian origin. It could be a great name for a
    baby boy whose parents have strong ties to
    Argentina. Dante Alighieri was a famous Italian
    poet who wrote "The Divine Comedy", which is
    considered one of the greatest works in Western
    literature.`
  },
  {
    id: 'daniel',
    name: 'Daniel',
    description: `This name means "enduring" or "steadfast" and is
    of Italian origin. It could be a great name for a
    baby boy whose parents have strong ties to
    Argentina. Dante Alighieri was a famous Italian
    poet who wrote "The Divine Comedy", which is
    considered one of the greatest works in Western
    literature. It could be a great name for a
    baby boy whose parents have strong ties to
    Argentina. Dante Alighieri was a famous Italian
    poet who wrote "The Divine Comedy", which is
    considered one of the greatest works in Western
    literature.`
  },
  {
    id: 'dario',
    name: 'Dario',
    description: `This name means "enduring" or "steadfast" and is
    of Italian origin. It could be a great name for a
    baby boy whose parents have strong ties to
    Argentina. Dante Alighieri was a famous Italian
    poet who wrote "The Divine Comedy", which is
    considered one of the greatest works in Western
    literature. Dante Alighieri was a famous Italian
    poet who wrote "The Divine Comedy", which is
    considered one of the greatest works in Western
    literature.`
  }
];

interface IName {
  id: string;
  name: string;
  description: string;
}

interface IResultsProps {
  onGoAgain: (value: boolean) => void;
}

export const Results = ({ onGoAgain }: IResultsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IName>({
    id: '',
    name: '',
    description: ''
  });
  const [selectedIndex, setSelectedIndex] =
    useState<number>(0);

  useEffect(() => {
    if (mockedResults.length) {
      setSelected(mockedResults[selectedIndex]);
    }
  }, [mockedResults, selectedIndex]);

  const socialRef = useRef<HTMLDivElement>(null);

  const handleShowSocial = () => setOpen(true);

  const handleHideSocial = () => setOpen(false);

  const handleGoAgain = () => onGoAgain(false);

  const handleSelectNext = () => {
    if (!isLastName) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleSelectPrev = () => {
    if (!isFirstName) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

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

  const isFirstName = selectedIndex === 0;

  const isLastName =
    selectedIndex === mockedResults.length - 1;

  return (
    <div className="results">
      <div className="results-count">
        <h3>
          {selectedIndex + 1}
          <b>/</b>
          {mockedResults.length}
        </h3>
      </div>
      <div className="results-name">
        <>
          {!isFirstName ? (
            <div
              className="results-name--prev"
              onClick={handleSelectPrev}
            >
              <ArrowDown />
            </div>
          ) : null}
          <div className="results-name--text">
            <p>
              <b>{selected.name} - </b>
              {selected.description}
            </p>
          </div>
          {!isLastName ? (
            <div
              className="results-name--next"
              onClick={handleSelectNext}
            >
              <ArrowDown />
            </div>
          ) : null}
          <div className="results-name--overlay"></div>
        </>
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
