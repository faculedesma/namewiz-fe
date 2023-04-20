import { useRef, useState, useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useFiltersContext } from '@components/contexts/FiltersContext';
import './aditional.scss';

export const AditionalInformation = () => {
  const [text, setText] = useState<string>('');

  const { filters, updateFilters } = useFiltersContext();

  const lengthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setText(filters.aditional ? filters.aditional : '');
  }, [filters.aditional]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updated = e.target.value;
    if (lengthRef.current) {
      if (updated.length > 100) {
        lengthRef.current.classList.add('error');
      } else {
        if (lengthRef.current.classList.contains('error')) {
          lengthRef.current.classList.remove('error');
        }
      }
    }
    setText(updated);
    updateFilters('aditional', updated);
  };

  return (
    <div className="aditional">
      <div className="aditional-input">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Additional information you want to add..."
        />
      </div>
      <p>
        <span ref={lengthRef}>{text.length}</span>/100
      </p>
    </div>
  );
};
