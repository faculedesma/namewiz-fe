import { useState } from 'react';
import { ChangeEvent } from 'react';
import { useFiltersContext } from '@components/contexts/FiltersContext';
import './letter-start.scss';

export const LetterStart = () => {
  const [letter, setLetter] = useState<string>('');

  const { updateFilters } = useFiltersContext();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const text = e.target.value;
    if (/^[a-zA-Z]*$/.test(text)) {
      setLetter(text.charAt(text.length - 1));
      updateFilters('start', text.charAt(text.length - 1));
    } else if (!text) {
      setLetter('');
      updateFilters('start', '');
    }
  };

  return (
    <div className="letter-start">
      <h3>Starts</h3>
      <input
        type="text"
        value={letter}
        onChange={handleInputChange}
        placeholder="A"
      />
    </div>
  );
};
