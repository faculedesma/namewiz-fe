import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import List, { ListRef } from '@components/list/List';
import { natureInspired } from '@constants/filters';
import './nature-inspired.scss';

const defaultNature = 'tree';

const defaultEmptyNature = [
  {
    key: '',
    label: ''
  }
];

type Nature = {
  key: string;
  label: string;
};

export const NatureInspired = () => {
  const [selectedPersonalities, setSelectedNature] =
    useState<Nature[]>(defaultEmptyNature);

  const natureRef = useRef<HTMLDivElement>(null);
  const natureListRef = useRef<ListRef>(null);

  useEffect(() => {
    if (natureInspired.length) {
      const defaultSelected = natureInspired.find(
        (nature) => nature.key === defaultNature
      );
      setSelectedNature([defaultSelected!]);
    }
  }, [natureInspired]);

  const handleNatureSelect = (key: string) => {
    const isSelected = selectedPersonalities.find(
      (pers) => pers.key === key
    );
    if (isSelected) {
      return;
    } else if (selectedPersonalities.length < 3) {
      const newSelected = natureInspired.find(
        (nature) => nature.key === key
      );
      setSelectedNature([
        ...selectedPersonalities,
        newSelected!
      ]);
    }
  };

  const handleOpen = () => {
    if (natureListRef.current) {
      natureListRef.current.open();
    }
  };

  const handleClose = () => {
    if (natureListRef.current) {
      natureListRef.current.close();
    }
  };

  useClickOutside(natureRef, handleClose);

  return (
    <div className="nature">
      <h3>Nature inspired</h3>
      <div ref={natureRef} className="nature-input">
        <div
          className="nature-input--top"
          onClick={handleOpen}
        >
          {selectedPersonalities.map((pers) => {
            return <p>{pers.label}</p>;
          })}
          <div className="nature-input--top-right">
            <div className="nature-input--top-right--arrow">
              <ArrowDown />
            </div>
          </div>
        </div>
        <List
          ref={natureListRef}
          items={natureInspired}
          onSelect={(item) => handleNatureSelect(item.key)}
          closeOnClick={false}
        />
      </div>
    </div>
  );
};
