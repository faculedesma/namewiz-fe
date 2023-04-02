import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import List, { ListRef } from '@components/list/List';
import { personalityTraits } from '@constants/filters';
import './personality.scss';

const defaultPersonality = 'adventurous';

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

  const personalityRef = useRef<HTMLDivElement>(null);
  const personalityListRef = useRef<ListRef>(null);

  useEffect(() => {
    if (personalityTraits.length) {
      const defaultSelected = personalityTraits.find(
        (personality) =>
          personality.key === defaultPersonality
      );
      setSelectedPersonality([defaultSelected!]);
    }
  }, [personalityTraits]);

  const handlePersonalitySelect = (key: string) => {
    const isSelected = selectedPersonalities.find(
      (pers) => pers.key === key
    );
    if (isSelected) {
      return;
    } else if (selectedPersonalities.length < 3) {
      const newSelected = personalityTraits.find(
        (personality) => personality.key === key
      );
      setSelectedPersonality([
        ...selectedPersonalities,
        newSelected!
      ]);
    }
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
          {selectedPersonalities.map((pers) => {
            return <p>{pers.label}</p>;
          })}
          <div className="personality-input--top-right">
            <div className="personality-input--top-right--arrow">
              <ArrowDown />
            </div>
          </div>
        </div>
        <List
          ref={personalityListRef}
          items={personalityTraits}
          onSelect={(item) =>
            handlePersonalitySelect(item.key)
          }
          closeOnClick={false}
        />
      </div>
    </div>
  );
};
