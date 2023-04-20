import { useEffect, useState } from 'react';
import { zodiacSigns } from '@constants/filters';
import { useFiltersContext } from '@components/contexts/FiltersContext';
import './zodiac-signs.scss';

export const ZodiacSigns = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const { filters, updateFilters } = useFiltersContext();

  useEffect(() => {
    setSelected(filters.zodiac);
  }),
    [filters.zodiac];

  const handleSingSelect = (id: string) => {
    let updatedSelected;
    if (selected.length < 2 && !selected.includes(id)) {
      updatedSelected = [...selected, id];
      setSelected(updatedSelected);
      updateFilters('zodiac', updatedSelected);
      return;
    }
    if (selected.includes(id)) {
      updatedSelected = selected.filter(
        (sign) => sign !== id
      );
      setSelected(updatedSelected);
      updateFilters('zodiac', updatedSelected);
    }
  };

  const isSelected = (id: string) => selected.includes(id);

  return (
    <div className="zodiac">
      <h3>Zodiac signs</h3>
      <div className="zodiac-signs">
        {zodiacSigns.map((sign) => {
          return (
            <div
              key={sign.id}
              className={`zodiac-signs--item ${
                isSelected(sign.id) ? 'sign-active' : ''
              }`}
              onClick={() => handleSingSelect(sign.id)}
            >
              {sign.icon}
              <label>{sign.name.substring(0, 3)}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
