import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import List, { ListRef } from '@components/list/List';
import { genders } from '@constants/filters';
import './gender.scss';

const defaultGender = 'male';

const defaultEmptyGender = {
  key: '',
  label: ''
};

type Gender = {
  key: string;
  label: string;
};

export const Gender = () => {
  const [selectedGender, setSelectedGender] =
    useState<Gender>(defaultEmptyGender);

  const genderRef = useRef<HTMLDivElement>(null);
  const genderListRef = useRef<ListRef>(null);

  useEffect(() => {
    if (genders.length) {
      const defaultSelected = genders.find(
        (gender) => gender.key === defaultGender
      );
      setSelectedGender(defaultSelected!);
    }
  }, [genders]);

  const handleGenderSelect = (key: string) => {
    const newSelected = genders.find(
      (gender) => gender.key === key
    );
    setSelectedGender(newSelected!);
  };

  const handleOpen = () => {
    if (genderListRef.current) {
      genderListRef.current.open();
    }
  };

  const handleClose = () => {
    if (genderListRef.current) {
      genderListRef.current.close();
    }
  };

  useClickOutside(genderRef, handleClose);

  return (
    <div className="nationality">
      <h3>Gender</h3>
      <div ref={genderRef} className="gender-input">
        <div
          className="gender-input--top"
          onClick={handleOpen}
        >
          <p>{selectedGender.label}</p>
          <div className="gender-input--top-right">
            <div className="gender-input--top-right--arrow">
              <ArrowDown />
            </div>
          </div>
        </div>
        <List
          ref={genderListRef}
          items={genders}
          onSelect={(item) => handleGenderSelect(item.key)}
        />
      </div>
    </div>
  );
};
