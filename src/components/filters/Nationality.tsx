import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import List, { ListRef } from '@components/list/List';
import { useFiltersContext } from '@components/contexts/FiltersContext';
import './nationality.scss';

const nationalities = [
  {
    id: 'one',
    key: 'nationalityOne'
  },
  {
    id: 'two',
    key: 'nationalityTwo'
  }
];

const COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=name,flags';

const parseCountries = (data: any) => {
  return data.map((country: any) => ({
    name: country.name.common,
    flagUrl: country.flags.svg
  }));
};

const defaultEmptyCountry = {
  name: '',
  flagUrl: ''
};

type Country = {
  name: string;
  flagUrl: string;
};

interface ICountryProps {
  id: string;
  countries: Country[];
}

const Country = ({ id, countries }: ICountryProps) => {
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultEmptyCountry);
  const countryKey = nationalities.find(
    (nation) => nation.id === id
  )!.key;

  const { filters, updateFilters } = useFiltersContext();

  useEffect(() => {
    if (!filters[countryKey]) {
      clearNationality();
    }
  }, [filters[countryKey]]);

  const countryRef = useRef<HTMLDivElement>(null);
  const countryListRef = useRef<ListRef>(null);

  const handleCountrySelect = (name: string) => {
    const prevCountry = selectedCountry.name;
    const newSelected = countries.find(
      (country) => country.name === name
    );
    const isSameSelected =
      newSelected!.name === prevCountry;
    const updatedCountry = !isSameSelected
      ? newSelected!
      : defaultEmptyCountry;
    setSelectedCountry(updatedCountry);
    if (id === 'one') {
      updateFilters('nationalityOne', updatedCountry.name);
    } else {
      updateFilters('nationalityTwo', updatedCountry.name);
    }
    if (isSameSelected)
      countryListRef.current?.clearItems();
  };

  const clearNationality = () => {
    countryListRef.current?.clearItems();
    setSelectedCountry(defaultEmptyCountry);
  };

  const handleOpen = () => countryListRef.current?.open();

  const handleClose = () => countryListRef.current?.close();

  useClickOutside(countryRef, handleClose);

  return (
    <div ref={countryRef} className="nationality-input">
      <div
        className="nationality-input--top"
        onClick={handleOpen}
      >
        <p title={selectedCountry.name}>
          {selectedCountry.name
            ? selectedCountry.name
            : 'Select'}
        </p>
        <div className="nationality-input--top-right">
          <div className="nationality-input--top-right--flag">
            {selectedCountry.flagUrl ? (
              <img
                src={selectedCountry.flagUrl}
                alt="flag"
              />
            ) : (
              <p>F</p>
            )}
          </div>
          <div className="nationality-input--top-right--arrow">
            <ArrowDown />
          </div>
        </div>
      </div>
      <List
        ref={countryListRef}
        items={countries.map((country) => ({
          key: country.name,
          label: country.name
        }))}
        onSelect={(item) => handleCountrySelect(item.key)}
      />
    </div>
  );
};

export const Nationality = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await fetch(COUNTRIES_URL);
        const data = await result.json();
        const parsedCountries: Country[] =
          parseCountries(data);
        setCountries(
          parsedCountries.sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        );
        setCountries(parsedCountries);
      } catch (e) {
        throw Error;
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="nationality">
      <h3>Nationality</h3>
      <div className="nationality-options">
        <Country id="one" countries={countries} />
        <Country id="two" countries={countries} />
      </div>
    </div>
  );
};
