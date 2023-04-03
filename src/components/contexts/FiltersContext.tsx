import {
  FC,
  ReactNode,
  createContext,
  useState,
  useContext
} from 'react';

const defaultFilters = {
  zodiac: [],
  nationality: [],
  gender: '',
  longitude: '',
  start: '',
  personality: [],
  nature: [],
  aditional: ''
};

interface FiltersState {
  zodiac: string[];
  nationality: string[];
  gender: string;
  longitude: string;
  start: string;
  personality: string[];
  nature: string[];
  aditional: string;
}

interface FiltersContextType {
  filters: FiltersState;
  updateFilters: <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K]
  ) => void;
}

interface FiltersContextProviderProps {
  children: ReactNode;
}

const FiltersContext = createContext<FiltersContextType>({
  filters: defaultFilters,
  updateFilters: () => {}
});

const FiltersContextProvider: FC<
  FiltersContextProviderProps
> = ({ children }) => {
  const [filters, setState] =
    useState<FiltersState>(defaultFilters);

  const updateFilters = <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K]
  ) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <FiltersContext.Provider
      value={{ filters, updateFilters }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

const useFiltersContext = () => useContext(FiltersContext);

export { FiltersContextProvider, useFiltersContext };
