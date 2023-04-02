import React, {
  useState,
  useImperativeHandle,
  forwardRef
} from 'react';
import './list.scss';

type ListItem = {
  key: string;
  label: string;
};

type ListProps = {
  items: ListItem[];
  onSelect: (item: ListItem) => void;
  searchPlaceholder?: string;
};

type ListRef = {
  open: () => void;
  close: () => void;
};

const List = forwardRef<ListRef, ListProps>(
  (props, ref) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item: ListItem) => {
      props.onSelect(item);
      setIsOpen(false);
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

    const filteredItems = props.items.filter((item) =>
      item.label
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose
    }));

    return (
      <div
        className={`generic-list ${
          isOpen ? 'open' : 'closed'
        }`}
      >
        <input
          type="text"
          value={search}
          placeholder={props.searchPlaceholder || 'Search'}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredItems.map((item) => (
            <li
              key={item.key}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default List;
