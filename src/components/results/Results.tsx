import { useEffect, useRef, useState } from 'react';
import { Instagram } from '@assets/svgs/Instagram';
import { WhatsApp } from '@assets/svgs/WhatsApp';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import { Newsletter } from '@components/newsletter/Newsletter';
import { useFiltersContext } from '@components/contexts/FiltersContext';
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
  const [previous, setPrevious] = useState<IName[]>([]);

  const socialRef = useRef<HTMLDivElement>(null);

  const { filters, updateFilters } = useFiltersContext();

  useEffect(() => {
    if (names.length) {
      setSelected(names[0]);
      updateFilters('previousNames', [
        ...filters.previousNames,
        names[0].name
      ]);
      setSelectedIndex(selectedIndex + 1);
      setPrevious([...previous, names[0]]);
    }
  }, [names]);

  useEffect(() => {
    if (filters.previousNames.length === 0) {
      setPrevious([]);
    }
  }, [filters.previousNames]);

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

  const handleHideSocial = () => setOpen(false);

  const handleSelectChipName = (
    name: string,
    index: number
  ) => {
    const newSelected = previous.find(
      (current) => current.name === name
    );
    setSelected(newSelected!);
    setSelectedIndex(index + 1);
  };

  useClickOutside(socialRef, handleHideSocial);

  return (
    <div className="results">
      <div className="results-box">
        <div className="results-box--count">
          <h3>
            {previous.length ? selectedIndex : 0}
            <b>/</b>
            {previous.length}
          </h3>
        </div>
        <div className="results-box--previous">
          {previous.map((current, index) => {
            return (
              <span
                onClick={() =>
                  handleSelectChipName(current.name, index)
                }
              >
                {current.name}
              </span>
            );
          })}
        </div>
        <div id="results-box" className="results-box--name">
          {names.length ? (
            <div>
              <div className="results-box--name-text">
                <p>
                  <b>{selected.name} - </b>
                  {selected.description}
                </p>
              </div>
              <div className="results-box--name-overlay"></div>
            </div>
          ) : (
            <p>Name and description will appear here.</p>
          )}
        </div>
      </div>
      <Newsletter />
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
