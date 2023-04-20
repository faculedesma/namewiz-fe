import { useEffect, useRef, useState } from 'react';
import { Share } from '@assets/svgs/Share';
import { Instagram } from '@assets/svgs/Instagram';
import { WhatsApp } from '@assets/svgs/WhatsApp';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import './results.scss';

interface IName {
  name: string;
  description: string;
}

interface IResultsProps {
  names: IName[];
}

export const Results = ({ names }: IResultsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IName>({
    name: '',
    description: ''
  });
  const [selectedIndex, setSelectedIndex] =
    useState<number>(0);

  useEffect(() => {
    if (names.length) {
      setSelected(names[selectedIndex]);
    }
  }, [names, selectedIndex]);

  const socialRef = useRef<HTMLDivElement>(null);

  const handleHideSocial = () => setOpen(false);

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

  const isLastName = selectedIndex === names.length - 1;

  return (
    <div className="results">
      <div className="results-box">
        <div className="results-box--count">
          <h3>
            {names.length ? selectedIndex + 1 : 0}
            <b>/</b>
            {names.length}
          </h3>
        </div>
        <div className="results-box--name">
          {names.length ? (
            <div>
              {!isFirstName ? (
                <div
                  className="results-name--prev"
                  onClick={handleSelectPrev}
                  onTouchStart={handleSelectPrev}
                >
                  <ArrowDown />
                </div>
              ) : null}
              <div className="results-box--name-text">
                <p>
                  <b>{selected.name} - </b>
                  {selected.description}
                </p>
              </div>
              {!isLastName ? (
                <div
                  className="results-name--next"
                  onClick={handleSelectNext}
                  onTouchEnd={handleSelectNext}
                >
                  <ArrowDown />
                </div>
              ) : null}
              <div className="results-box--name-overlay"></div>
            </div>
          ) : (
            <p>Name and description will appear here.</p>
          )}
        </div>
      </div>
      <div className="results-ctas">
        <div className="results-ctas--share">
          {/* <div
            className="results-ctas--share-button"
            onClick={handleShowSocial}
          >
            <Share />
          </div> */}
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
