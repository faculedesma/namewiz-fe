import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import List, { ListRef } from '@components/list/List';
import { genders } from '@constants/filters';
import { useFiltersContext } from '@components/contexts/FiltersContext';
import './gender.scss';

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

  const { filters, updateFilters } = useFiltersContext();

  useEffect(() => {
    if (filters.gender) {
      setSelectedGender({
        key: filters.gender,
        label: genders.find(
          (gen) => gen.key === filters.gender
        )!.label
      });
    } else {
      clearGender();
    }
  }, [filters.gender]);

  const genderRef = useRef<HTMLDivElement>(null);
  const genderListRef = useRef<ListRef>(null);

  const handleGenderSelect = (key: string) => {
    const previousGender = selectedGender.key;
    const newSelected = genders.find(
      (gender) => gender.key === key
    );
    const updatedGender =
      newSelected!.key === previousGender
        ? defaultEmptyGender
        : newSelected!;
    setSelectedGender(updatedGender);
    updateFilters('gender', updatedGender.key);
  };

  const clearGender = () => {
    genderListRef.current?.clearItems();
    setSelectedGender(defaultEmptyGender);
  };

  const handleOpen = () => genderListRef.current?.open();

  const handleClose = () => genderListRef.current?.close();

  useClickOutside(genderRef, handleClose);

  return (
    <div className="gender">
      <h3>Gender</h3>
      <div ref={genderRef} className="gender-input">
        <div
          className="gender-input--top"
          onClick={handleOpen}
        >
          <p title={selectedGender.label}>
            {selectedGender.key
              ? selectedGender.label
              : 'Select'}
          </p>
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
