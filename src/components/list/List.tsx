import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef
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

export type ListRef = {
  open: () => void;
  close: () => void;
};

const List = forwardRef<ListRef, ListProps>(
  (props, ref) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const listRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (item: ListItem) => {
      props.onSelect(item);
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

    useEffect(() => {
      if (isOpen && listRef.current) {
        listRef.current.classList.add('open');
        listRef.current.classList.remove('close');
      } else if (!isOpen && listRef.current) {
        listRef.current.classList.add('close');
        listRef.current.classList.remove('open');
      }
    }, [isOpen]);

    return (
      <div ref={listRef} className="generic-list">
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
