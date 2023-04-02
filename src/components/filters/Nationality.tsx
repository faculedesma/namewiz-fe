import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import { Loader } from '@components/loader/Loader';
import List, { ListRef } from '@components/list/List';
import './nationality.scss';

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
  countries: Country[];
  defaultCountry: string;
}

const Country = ({
  countries,
  defaultCountry
}: ICountryProps) => {
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultEmptyCountry);

  const countryRef = useRef<HTMLDivElement>(null);
  const countryListRef = useRef<ListRef>(null);

  useEffect(() => {
    if (countries.length) {
      const defaultSelected = countries.find(
        (country) => country.name === defaultCountry
      );
      setFilteredCountries(countries);
      setSelectedCountry(defaultSelected!);
    }
  }, [countries]);

  const handleCountrySelect = (name: string) => {
    const newSelected = filteredCountries.find(
      (country) => country.name === name
    );
    setSelectedCountry(newSelected!);
  };

  const handleOpen = () => {
    if (countryListRef.current) {
      countryListRef.current.open();
    }
  };

  const handleClose = () => {
    if (countryListRef.current) {
      countryListRef.current.close();
    }
  };

  useClickOutside(countryRef, handleClose);

  return (
    <div ref={countryRef} className="nationality-input">
      <div
        className="nationality-input--top"
        onClick={handleOpen}
      >
        <p>{selectedCountry.name}</p>
        <div className="nationality-input--top-right">
          <div className="nationality-input--top-right--flag">
            {selectedCountry.flagUrl ? (
              <img
                src={selectedCountry.flagUrl}
                alt="flag"
              />
            ) : (
              <Loader />
            )}
          </div>
          <div className="nationality-input--top-right--arrow">
            <ArrowDown />
          </div>
        </div>
      </div>
      <List
        ref={countryListRef}
        items={filteredCountries.map((country) => ({
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
        const parsedCountries = parseCountries(data);
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
      <div className="nationality-selectors">
        <Country
          countries={countries}
          defaultCountry="Argentina"
        />
        <Country
          countries={countries}
          defaultCountry="Spain"
        />
      </div>
    </div>
  );
};
