import { useRef, useState, useEffect } from 'react';
import { ArrowDown } from '@assets/svgs/ArrowDown';
import { useClickOutside } from '@components/hooks/useClickOutside';
import List, { ListRef } from '@components/list/List';
import { longitudes } from '@constants/filters';
import { useFiltersContext } from '@components/contexts/FiltersContext';
import './longitude.scss';

const defaultEmptyLongitude = {
  key: '',
  label: ''
};

type Longitude = {
  key: string;
  label: string;
};

export const Longitude = () => {
  const [selectedLongitude, setSelectedLongitude] =
    useState<Longitude>(defaultEmptyLongitude);

  const { filters, updateFilters } = useFiltersContext();

  useEffect(() => {
    if (filters.longitude) {
      setSelectedLongitude({
        key: filters.longitude,
        label: longitudes.find(
          (long) => long.key === filters.longitude
        )!.label
      });
    } else {
      clearLongitude();
    }
  }, [filters.longitude]);

  const longitudeRef = useRef<HTMLDivElement>(null);
  const longitudeListRef = useRef<ListRef>(null);

  const handleLongitudeSelect = (key: string) => {
    const newSelected = longitudes.find(
      (longitude) => longitude.key === key
    );
    setSelectedLongitude(newSelected!);
    updateFilters('longitude', newSelected!.key);
  };

  const clearLongitude = () => {
    if (longitudeListRef.current) {
      longitudeListRef.current.clearItems();
    }
    setSelectedLongitude(defaultEmptyLongitude);
  };

  const handleOpen = () => {
    if (longitudeListRef.current) {
      longitudeListRef.current.open();
    }
  };

  const handleClose = () => {
    if (longitudeListRef.current) {
      longitudeListRef.current.close();
    }
  };

  useClickOutside(longitudeRef, handleClose);

  return (
    <div className="longitude">
      <h3>Longitude</h3>
      <div ref={longitudeRef} className="longitude-input">
        <div
          className="longitude-input--top"
          onClick={handleOpen}
        >
          <p>
            {selectedLongitude.key
              ? selectedLongitude.label
              : 'Select'}
          </p>
          <div className="longitude-input--top-right">
            <div className="longitude-input--top-right--arrow">
              <ArrowDown />
            </div>
          </div>
        </div>
        <List
          ref={longitudeListRef}
          includeSearch={false}
          items={longitudes}
          onSelect={(item) =>
            handleLongitudeSelect(item.key)
          }
        />
      </div>
    </div>
  );
};
