import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@components/hooks/useClickOutside';
import List, { ListRef } from '@components/list/List';
import { personalityTraits } from '@constants/filters';
import { useFiltersContext } from '@components/contexts/FiltersContext';
import './personality.scss';

const defaultEmptyPersonality = [
  {
    key: '',
    label: ''
  }
];

type Personality = {
  key: string;
  label: string;
};

export const PersonalityTraits = () => {
  const [selectedPersonalities, setSelectedPersonality] =
    useState<Personality[]>(defaultEmptyPersonality);

  const { filters, updateFilters } = useFiltersContext();

  const personalityRef = useRef<HTMLDivElement>(null);
  const personalityListRef = useRef<ListRef>(null);

  useEffect(() => {
    if (!filters.personality.length) {
      clearPersonalityTraits();
    }
  }, [filters.personality]);

  const handlePersonalitySelect = (key: string) => {
    const isSelected = selectedPersonalities.find(
      (pers) => pers.key === key
    );
    if (isSelected) {
      const chip = document.getElementById(key);
      chip?.classList.add('hide');
      setTimeout(() => {
        const updatedPersonalities =
          selectedPersonalities.filter(
            (pers) => pers.key !== key
          );
        setSelectedPersonality(updatedPersonalities);
        updateFilters(
          'personality',
          updatedPersonalities.map((pers) => pers.key)
        );
      }, 101.125);
    } else if (selectedPersonalities.length < 3) {
      const newSelected = personalityTraits.find(
        (personality) => personality.key === key
      );
      const updatedPersonalities = [
        ...selectedPersonalities,
        newSelected!
      ];
      setSelectedPersonality(updatedPersonalities);
      updateFilters(
        'personality',
        updatedPersonalities.map((pers) => pers.key)
      );
    }
  };

  const clearPersonalityTraits = () => {
    if (personalityListRef.current) {
      personalityListRef.current.clearItems();
    }

    setSelectedPersonality([]);
  };

  const handleOpen = () => {
    if (personalityListRef.current) {
      personalityListRef.current.open();
    }
  };

  const handleClose = () => {
    if (personalityListRef.current) {
      personalityListRef.current.close();
    }
  };

  useClickOutside(personalityRef, handleClose);

  return (
    <div className="personality">
      <h3>Personality traits</h3>
      <div
        ref={personalityRef}
        className="personality-input"
      >
        <div
          className="personality-input--top"
          onClick={handleOpen}
        >
          {selectedPersonalities.length ? (
            selectedPersonalities.map((pers) => {
              return (
                <p
                  key={pers.key}
                  id={pers.key}
                  title={pers.label}
                >
                  {pers.label}
                </p>
              );
            })
          ) : (
            <span>Select max. 3</span>
          )}
        </div>
        <List
          ref={personalityListRef}
          items={personalityTraits}
          onSelect={(item) =>
            handlePersonalitySelect(item.key)
          }
          closeOnClick={false}
          multiple
          maxSelected={3}
        />
      </div>
    </div>
  );
};
