import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@components/hooks/useClickOutside';
import List, { ListRef } from '@components/list/List';
import { natureInspired } from '@constants/filters';
import './nature-inspired.scss';

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
  const [selectedNature, setSelectedNature] = useState<
    Nature[]
  >(defaultEmptyNature);

  const natureRef = useRef<HTMLDivElement>(null);
  const natureListRef = useRef<ListRef>(null);

  useEffect(() => {
    if (natureInspired.length) {
      setSelectedNature([]);
    }
  }, [natureInspired]);

  const handleNatureSelect = (key: string) => {
    const isSelected = selectedNature.find(
      (nature) => nature.key === key
    );
    if (isSelected) {
      const chip = document.getElementById(key);
      chip?.classList.add('hide');
      setTimeout(() => {
        setSelectedNature(
          selectedNature.filter(
            (nature) => nature.key !== key
          )
        );
      }, 101.125);
    } else if (selectedNature.length < 3) {
      const newSelected = natureInspired.find(
        (nature) => nature.key === key
      );
      setSelectedNature([...selectedNature, newSelected!]);
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
          {selectedNature.length ? (
            selectedNature.map((nature) => {
              return (
                <p
                  key={nature.key}
                  id={nature.key}
                  title={nature.label}
                >
                  {nature.label}
                </p>
              );
            })
          ) : (
            <span>Select max. 3</span>
          )}
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
