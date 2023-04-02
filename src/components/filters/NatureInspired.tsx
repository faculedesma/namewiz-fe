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
      (pers) => pers.key === key
    );
    if (isSelected) {
      setSelectedNature(
        selectedNature.filter((pers) => pers.key !== key)
      );
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
            selectedNature.map((pers) => {
              return <p>{pers.label}</p>;
            })
          ) : (
            <span>Select</span>
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
