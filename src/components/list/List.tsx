import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef
} from 'react';
import { CheckIcon } from '@assets/svgs/CheckIcon';
import './list.scss';

type ListItem = {
  key: string;
  label: string;
};

type ListProps = {
  items: ListItem[];
  onSelect: (item: ListItem) => void;
  includeSearch?: boolean;
  searchPlaceholder?: string;
  closeOnClick?: boolean;
  multiple?: boolean;
  maxSelected?: number;
};

export type ListRef = {
  open: () => void;
  close: () => void;
  clearItems: () => void;
};

const List = forwardRef<ListRef, ListProps>(
  (props, ref) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<
      string[]
    >([]);

    const listRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (item: ListItem) => {
      props.onSelect(item);
      if (props.multiple) {
        if (selectedItems.includes(item.key)) {
          setSelectedItems((prevItems) =>
            prevItems.filter(
              (currentItem) => currentItem !== item.key
            )
          );
        } else {
          if (selectedItems.length < props.maxSelected!) {
            setSelectedItems((prevItems) => [
              ...prevItems,
              item.key
            ]);
          }
        }
      } else {
        setSelectedItems([item.key]);
      }
      if (props.closeOnClick) {
        setIsOpen(false);
      }
    };

    const handleSearchChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setSearch(e.target.value);
    };

    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleClearItems = () => setSelectedItems([]);

    const filteredItems = props.items.filter((item) =>
      item.label
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
      clearItems: handleClearItems
    }));

    useEffect(() => {
      if (isOpen && listRef.current) {
        listRef.current.classList.remove('close');
        listRef.current.classList.add('open');
      } else if (!isOpen && listRef.current) {
        if (listRef.current.classList.contains('open')) {
          listRef.current.classList.add('close');
          listRef.current.classList.remove('open');
        }
      }
    }, [isOpen]);

    return (
      <div ref={listRef} className="generic-list">
        {props.includeSearch ? (
          <input
            type="text"
            value={search}
            placeholder={
              props.searchPlaceholder || 'Search'
            }
            onChange={handleSearchChange}
          />
        ) : null}
        <ul>
          {filteredItems.map((item) => (
            <li
              key={item.key}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
              {selectedItems.includes(item.key) && (
                <CheckIcon />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

List.defaultProps = {
  includeSearch: true,
  closeOnClick: true,
  multiple: false,
  maxSelected: 1
};

export default List;
