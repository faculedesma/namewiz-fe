import { useEffect, useRef, useState } from 'react';
import { ChangeEvent } from 'react';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
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
  const [search, setSearch] = useState<string>('');

  const countryRef = useRef<HTMLDivElement>(null);
  const countryListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (countries.length) {
      const defaultSelected = countries.find(
        (country) => country.name === defaultCountry
      );
      setFilteredCountries(countries);
      setSelectedCountry(defaultSelected!);
    }
  }, [countries]);

  const handleCountrySearch = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const filtered = countries.filter((country) => {
      return country.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setFilteredCountries(filtered);
  };

  const handleCloseList = () => {
    if (countryListRef.current) {
      countryListRef.current.classList.remove('show-list');
      countryListRef.current.classList.add('hide-list');
    }
  };

  const handleOpenList = () => {
    if (countryListRef.current) {
      if (
        !countryListRef.current.classList.contains(
          'show-list'
        )
      ) {
        countryListRef.current.classList.remove(
          'hide-list'
        );
        countryListRef.current.classList.add('show-list');
      } else {
        handleCloseList();
      }
    }
  };

  const handleCountryClick = (name: string) => {
    const newSelected = filteredCountries.find(
      (country) => country.name === name
    );
    setSelectedCountry(newSelected!);
  };

  useClickOutside(countryRef, handleCloseList);

  return (
    <div ref={countryRef} className="nationality-input">
      <div
        className="nationality-input--top"
        onClick={handleOpenList}
      >
        <p>{selectedCountry.name}</p>
        <div className="nationality-input--top-right">
          <div className="nationality-input--top-right--flag">
            <img src={selectedCountry.flagUrl} alt="flag" />
          </div>
          <div className="nationality-input--top-right--arrow">
            <ArrowDown />
          </div>
        </div>
      </div>
      <div
        ref={countryListRef}
        className="nationality-input--list"
      >
        <ul>
          <li>
            <input
              type="text"
              value={search}
              onChange={(e) => handleCountrySearch(e)}
            />{' '}
          </li>
          {filteredCountries.map((country) => {
            return (
              <li
                key={country.name}
                onClick={() =>
                  handleCountryClick(country.name)
                }
              >
                {country.name}
              </li>
            );
          })}
        </ul>
      </div>
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
      <h3>Nationality:</h3>
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
